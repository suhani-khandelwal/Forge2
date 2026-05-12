// Centralized API config
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getApiUrl = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};
