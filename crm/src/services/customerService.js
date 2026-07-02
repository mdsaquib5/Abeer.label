import apiClient from './apiClient';

export const getCustomers = async (queryString) => {
  const response = await apiClient.get(`/crm/customers?${queryString}`);
  return response.data;
};

export const getCustomersPreview = async (queryString) => {
  const response = await apiClient.get(`/crm/customers/preview?${queryString}`);
  return response.data;
};

export const getCustomerDetails = async (customerId) => {
  const response = await apiClient.get(`/crm/customers/${customerId}`);
  return response.data;
};
