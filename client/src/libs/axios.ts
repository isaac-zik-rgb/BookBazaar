import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getRefreshToken,
  getAccessToken,
  storeRefreshToken,
  storeAccessToken,
} from "utils";
import { API_BASE_URL } from "configs";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 65000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Token ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    // Check for token refresh condition (e.g., status 417)
    if (error.response?.status === 417) {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        storeAccessToken(newAccessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response);
  }
);

// Refresh Token Function
async function refreshToken(): Promise<string> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) throw new Error("No refresh token available");

  try {
    const response = await axios.get(`${API_BASE_URL}/users/refresh-token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { access_token: newAccessToken, refresh_token: newRefreshToken } =
      response.data;
    storeAccessToken(newAccessToken);
    storeRefreshToken(newRefreshToken);
    return newAccessToken;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to refresh token");
  }
}

export function get<T>(path: string, params?: any): Promise<AxiosResponse<T>> {
  return axiosInstance.get<T>(path, { params });
}

export function post<T>(
  path: string,
  body: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return axiosInstance.post<T>(path, body, config);
}

export function put<T>(
  path: string,
  body: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return axiosInstance.put<T>(path, body, config);
}

export function patch<T>(
  path: string,
  body: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return axiosInstance.patch<T>(path, body, config);
}

export function del<T>(path: string): Promise<AxiosResponse<T>> {
  return axiosInstance.delete<T>(path);
}

export default axiosInstance;
