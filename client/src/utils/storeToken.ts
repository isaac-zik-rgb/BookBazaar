export const storeAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
  };
  
  export const storeRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
  };
  