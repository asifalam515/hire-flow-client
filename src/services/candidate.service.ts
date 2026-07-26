import { apiClient } from '@/lib/api';

export const getResume = async () => {
  const response = await apiClient.get('/candidates/me/resume');
  return response.data;
};

export const updateProfile = async (data: any) => {
  const response = await apiClient.patch('/candidates/me/resume', data);
  return response.data;
};

export const addWorkExperience = async (data: any) => {
  const response = await apiClient.post('/candidates/me/experience', data);
  return response.data;
};

export const updateWorkExperience = async (id: string, data: any) => {
  const response = await apiClient.patch(`/candidates/me/experience/${id}`, data);
  return response.data;
};

export const deleteWorkExperience = async (id: string) => {
  const response = await apiClient.delete(`/candidates/me/experience/${id}`);
  return response.data;
};

export const addEducation = async (data: any) => {
  const response = await apiClient.post('/candidates/me/education', data);
  return response.data;
};

export const updateEducation = async (id: string, data: any) => {
  const response = await apiClient.patch(`/candidates/me/education/${id}`, data);
  return response.data;
};

export const deleteEducation = async (id: string) => {
  const response = await apiClient.delete(`/candidates/me/education/${id}`);
  return response.data;
};

export const downloadResume = async () => {
  const response = await apiClient.get('/candidates/me/resume/download', {
    headers: { 'Accept': 'application/pdf' }
  });
  
  if (response instanceof Blob || response instanceof ArrayBuffer || (response as any).byteLength) {
     // If the apiClient returns the raw buffer or blob (depending on how it handles non-json)
     return response;
  }
  return response;
};

export const uploadCustomResume = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post('/upload/document', formData);
  return response.data;
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post('/upload/image', formData);
  return response.data;
};

