export const removeAccessToken = () => {
    return localStorage.removeItem('accessToken');
  };
  
  export const removeRefreshToken = () => {
    return localStorage.removeItem('refreshToken');
  };
