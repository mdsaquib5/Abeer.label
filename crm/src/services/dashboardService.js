import apiClient from './apiClient';

export const getDashboardStats = async () => {
  const response = await apiClient.get('/crm/dashboard-stats');
  return response.data;
};

export const recomputeEngine = async () => {
  const response = await apiClient.post('/crm/recompute', {});
  return response.data;
};
