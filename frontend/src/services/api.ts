const API_BASE = '/api';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401) {
    if (!endpoint.includes('/auth/login') && !endpoint.includes('/auth/setup')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({ message: 'Unauthorized' }));
    throw new ApiError(error.message || 'Unauthorized', 401);
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new ApiError(error.message || 'Request failed', response.status);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: 'POST', body }),
  put: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: 'PUT', body }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

// --- Types ---
export interface Artist {
  id: number;
  name: string;
  instrument: string;
  country: string;
  bio: string;
  imageUrl: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  isUpcoming: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface ContentBlock {
  id: number;
  key: string;
  title: string;
  body: string;
  imageUrl: string;
  sortOrder: number;
  locale: string;
  updatedAt: string | null;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// --- API helpers ---
export const artistApi = {
  list: () => api.get<Artist[]>('/artists'),
  featured: () => api.get<Artist[]>('/artists/featured'),
  get: (id: number) => api.get<Artist>(`/artists/${id}`),
  create: (data: Omit<Artist, 'id' | 'createdAt' | 'updatedAt'>) => api.post<{ id: number }>('/artists', data),
  update: (id: number, data: Partial<Artist>) => api.put<{ message: string }>(`/artists/${id}`, data),
  delete: (id: number) => api.delete<{ message: string }>(`/artists/${id}`),
};

export const eventApi = {
  list: () => api.get<Event[]>('/events'),
  upcoming: () => api.get<Event[]>('/events/upcoming'),
  get: (id: number) => api.get<Event>(`/events/${id}`),
  create: (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => api.post<{ id: number }>('/events', data),
  update: (id: number, data: Partial<Event>) => api.put<{ message: string }>(`/events/${id}`, data),
  delete: (id: number) => api.delete<{ message: string }>(`/events/${id}`),
};

export const contentApi = {
  list: (locale: string = 'en') => api.get<ContentBlock[]>(`/content?locale=${locale}`),
  get: (key: string, locale: string = 'en') => api.get<ContentBlock>(`/content/${key}?locale=${locale}`),
  update: (id: number, data: Partial<ContentBlock>) => api.put<ContentBlock>(`/content/${id}`, data),
  updateByKey: (key: string, data: Partial<ContentBlock>, locale: string = 'en') =>
    api.put<ContentBlock>(`/content/key/${key}?locale=${locale}`, data),
  create: (data: Partial<ContentBlock>) => api.post<{ id: number }>('/content', data),
  delete: (id: number) => api.delete<{ message: string }>(`/content/${id}`),
};

export const contactApi = {
  submit: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post<{ message: string }>('/contact', data),
  list: () => api.get<ContactMessage[]>('/contact'),
  markRead: (id: number) => api.put<{ message: string }>(`/contact/${id}/read`, {}),
  delete: (id: number) => api.delete<{ message: string }>(`/contact/${id}`),
};

export { ApiError };
export default api;
