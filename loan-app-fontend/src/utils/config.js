const devConfig = {
    api_host: import.meta.env.VITE_BASE_URL,
    secret_key: import.meta.env.VITE_SECRET_KEY,
  };
  
  const prodConfig = {
    api_host: 'Your production url',
  };
  
  export const config = devConfig;