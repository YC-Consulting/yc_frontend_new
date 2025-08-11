// Environment configuration
export const config = {
  API_BASE_URL: import.meta.env.DEV 
    ? 'http://api.yconsulting.co.uk:8003' 
    : 'https://api.yconsulting.co.uk',
  
  // Other environment-specific settings
  TIMEOUT: 10000, // 10 seconds
  ENABLE_LOGGING: import.meta.env.DEV,
} as const;

export default config;
