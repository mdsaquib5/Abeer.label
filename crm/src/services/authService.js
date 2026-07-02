import apiClient from './apiClient';

export const loginAdmin = async (email, password) => {
  const response = await apiClient.post('/crm/auth/login', { email, password });
  return response.data;
};
