import { apiClient } from '@/lib/api';

export const getResume = async <T = any>(): Promise<T> => {
  const response = await apiClient.get<T>('/candidates/me/resume');
  return response.data;
};

export const updateProfile = async <T = any>(data: any): Promise<T> => {
  const payload = { ...data };
  if (payload.user) {
    if (payload.user.firstName !== undefined) payload.firstName = payload.user.firstName;
    if (payload.user.lastName !== undefined) payload.lastName = payload.user.lastName;
    if (payload.user.avatarUrl !== undefined) payload.avatarUrl = payload.user.avatarUrl;
    delete payload.user;
  }
  const response = await apiClient.patch<T>('/candidates/me/resume', payload);
  return response.data;
};

export const addWorkExperience = async <T = any>(data: any): Promise<T> => {
  const response = await apiClient.post<T>('/candidates/me/experience', data);
  return response.data;
};

export const updateWorkExperience = async <T = any>(id: string, data: any): Promise<T> => {
  const response = await apiClient.patch<T>(`/candidates/me/experience/${id}`, data);
  return response.data;
};

export const deleteWorkExperience = async <T = any>(id: string): Promise<T> => {
  const response = await apiClient.delete<T>(`/candidates/me/experience/${id}`);
  return response.data;
};

export const addEducation = async <T = any>(data: any): Promise<T> => {
  const response = await apiClient.post<T>('/candidates/me/education', data);
  return response.data;
};

export const updateEducation = async <T = any>(id: string, data: any): Promise<T> => {
  const response = await apiClient.patch<T>(`/candidates/me/education/${id}`, data);
  return response.data;
};

export const deleteEducation = async <T = any>(id: string): Promise<T> => {
  const response = await apiClient.delete<T>(`/candidates/me/education/${id}`);
  return response.data;
};

export const downloadResume = async () => {
  const response = await apiClient.get<any>('/candidates/me/resume/download', {
    headers: { 'Accept': 'application/pdf' }
  });
  
  if (response instanceof Blob || response instanceof ArrayBuffer || (response as any).byteLength) {
     return response;
  }
  return response;
};

export const uploadCustomResume = async <T = any>(file: File): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<T>('/upload/document', formData);
  return response.data;
};

export const uploadProfileImage = async <T = any>(file: File): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post<T>('/upload/image', formData);
  return response.data;
};
