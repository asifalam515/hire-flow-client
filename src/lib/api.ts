export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8050/api/v1';

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: {
    code?: string;
    details?: any;
  };
}

export interface ApiResponse<T = any> {
  success: true;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export class ApiError extends Error {
  public status: number;
  public details?: any;
  public code?: string;

  constructor(message: string, status: number, details?: any, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
    this.code = code;
  }
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

/**
 * Universal Fetch Wrapper targeting http://localhost:5000/api/v1
 * Handles cross-origin credentials and strict JSON normalization.
 */
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers, ...customConfig } = options;

  // Build query string if params exist
  const url = new URL(
    endpoint.startsWith('http')
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const isFormData =
    typeof FormData !== 'undefined' && customConfig.body instanceof FormData;

  let authHeader: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token && !(headers as Record<string, string>)?.['Authorization']) {
      authHeader = { Authorization: `Bearer ${token}` };
    }
  }

  const mergedHeaders: Record<string, string> = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...authHeader,
    ...(headers as Record<string, string>),
  };

  const config: RequestInit = {
    ...customConfig,
    // CRITICAL: Ensure credentials (`credentials: 'include'`) are passed for HttpOnly refresh/session cookies
    credentials: customConfig.credentials ?? 'include',
    headers: mergedHeaders,
  };

  try {
    const response = await fetch(url.toString(), config);
    const contentType = response.headers.get('content-type');
    let data: any = null;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (!response.ok) {
      const errorMessage = data?.message || `Request failed with status ${response.status}`;
      throw new ApiError(
        errorMessage,
        response.status,
        data?.error?.details || data?.errors,
        data?.error?.code
      );
    }

    // Ensure normalized response matching our backend structure
    if (data && typeof data === 'object' && 'success' in data) {
      return data as ApiResponse<T>;
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      500
    );
  }
}

// HTTP Helper Methods
apiClient.get = <T>(endpoint: string, options?: FetchOptions) =>
  apiClient<T>(endpoint, { ...options, method: 'GET' });

apiClient.post = <T>(endpoint: string, body?: any, options?: FetchOptions) =>
  apiClient<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers:
      body instanceof FormData
        ? { ...options?.headers, 'Content-Type': undefined as any }
        : options?.headers,
  });

apiClient.put = <T>(endpoint: string, body?: any, options?: FetchOptions) =>
  apiClient<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });

apiClient.patch = <T>(endpoint: string, body?: any, options?: FetchOptions) =>
  apiClient<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });

apiClient.delete = <T>(endpoint: string, options?: FetchOptions) =>
  apiClient<T>(endpoint, { ...options, method: 'DELETE' });

/**
 * Helper to upload an image file (File or Blob) to our backend Cloudinary service.
 */
export async function uploadFileToCloudinary(
  file: File | Blob,
  folder: string = 'hire-flow/uploads'
): Promise<{ url: string; publicId: string; width?: number; height?: number }> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await apiClient.post<{ url: string; publicId: string; width: number; height: number }>(
    `/upload/image?folder=${encodeURIComponent(folder)}`,
    formData
  );

  return res.data;
}
