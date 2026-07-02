import apiClient from './apiClient';

export const getCampaigns = async () => {
  const response = await apiClient.get('/crm/campaigns');
  return response.data;
};

export const createCampaign = async (payload) => {
  const response = await apiClient.post('/crm/campaigns', payload);
  return response.data;
};

export const sendCampaign = async (campaignId) => {
  const response = await apiClient.post(`/crm/campaigns/${campaignId}/send`, {});
  return response.data;
};

export const getCampaignStats = async (campaignId) => {
  const response = await apiClient.get(`/crm/campaigns/${campaignId}`);
  return response.data;
};
