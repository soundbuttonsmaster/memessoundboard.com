// export const API_BASE_URL = 'http://play.soundboard.cloud/api/SoundBoard.soundbuttons.com';

export const API_BASE_URL = 'http://192.168.1.67:8051/api/MemesSoundBoard';

export interface Sound {
  id: number;
  name: string;
  sound_file: string;
  tag?: string;
  tags?: string[];
  category?: number;
  category_id?: number;
  category_name?: string;
  views?: number;
  is_liked?: boolean;
  is_favorited?: boolean;
  likes_count?: number;
  favorites_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();

    // Handle ApiResponse format: { status: 200, data: {...} }
    if (result && typeof result === 'object' && 'data' in result && result.data) {
      return result.data as T;
    }

    return result as T;
  } catch (error) {
    console.error('API fetch error:', error);
    return null;
  }
}

export async function fetchNewSounds(limit: number = 40): Promise<PaginatedResponse<Sound>> {
  const data = await fetchApi<PaginatedResponse<Sound>>(`/sounds/new?page_size=${limit}`);
  if (data && 'results' in data) {
    return data;
  }
  return { count: 0, next: null, previous: null, results: [] };
}

export async function fetchTrendingSounds(limit: number = 40): Promise<PaginatedResponse<Sound>> {
  const data = await fetchApi<PaginatedResponse<Sound>>(`/sounds/trending?page_size=${limit}`);
  if (data && 'results' in data) {
    return data;
  }
  return { count: 0, next: null, previous: null, results: [] };
}

export async function fetchSounds(params: {
  page?: number;
  page_size?: number;
  category?: number;
  tag?: string;
  search?: string;
} = {}): Promise<PaginatedResponse<Sound>> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.page_size) queryParams.append('page_size', params.page_size.toString());
  if (params.category) queryParams.append('category', params.category.toString());
  if (params.tag) queryParams.append('tag', params.tag);
  if (params.search) queryParams.append('search', params.search);

  const queryString = queryParams.toString();
  const data = await fetchApi<PaginatedResponse<Sound>>(`/sounds${queryString ? `?${queryString}` : ''}`);

  if (data && 'results' in data) {
    return data;
  }

  // Return empty paginated response
  return {
    count: 0,
    next: null,
    previous: null,
    results: []
  };
}

export async function fetchSoundById(id: number): Promise<Sound | null> {
  try {
    const url = `${API_BASE_URL}/sounds/${id}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`API error for sound ${id}: ${response.status} ${response.statusText}`);
      return null;
    }

    const responseData = await response.json();

    // Handle ApiResponse format: { status: 200, data: {...} }
    if (responseData && typeof responseData === 'object' && 'data' in responseData && responseData.data) {
      return responseData.data as Sound;
    }

    // Handle direct Sound format: { id: 1, name: "...", ... }
    if (responseData && typeof responseData === 'object' && 'id' in responseData && 'name' in responseData) {
      return responseData as Sound;
    }

    console.error(`Unexpected API response format for sound ${id}:`, JSON.stringify(responseData).substring(0, 200));
    return null;
  } catch (error) {
    console.error(`Error fetching sound ${id}:`, error);
    return null;
  }
}

export async function searchSounds(query: string, page: number = 1, page_size: number = 40): Promise<PaginatedResponse<Sound>> {
  const data = await fetchApi<PaginatedResponse<Sound>>(`/sounds/search?name=${encodeURIComponent(query)}&page=${page}&page_size=${page_size}`);
  if (data && 'results' in data) {
    return data;
  }
  return { count: 0, next: null, previous: null, results: [] };
}

export async function fetchRelatedSounds(soundId: number, limit: number = 10): Promise<Sound[]> {
  const data = await fetchApi<PaginatedResponse<Sound>>(`/sounds/${soundId}/related?limit=${limit}`);
  if (data && 'results' in data) {
    return data.results;
  }
  return [];
}

export async function likeSound(token: string, soundId: number): Promise<{ message: string; sound: Sound } | null> {
  try {
    const url = `${API_BASE_URL}/sounds/${soundId}/like`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();

    // Handle ApiResponse format: { status: 201, data: { message: "...", sound: {...} } }
    if (result && typeof result === 'object' && 'data' in result && result.data) {
      return result.data as { message: string; sound: Sound };
    }

    // Handle direct response format
    if (result && typeof result === 'object' && 'message' in result && 'sound' in result) {
      return result as { message: string; sound: Sound };
    }

    console.error('Unexpected like response format:', result);
    return null;
  } catch (error) {
    console.error('Like sound error:', error);
    return null;
  }
}

export async function unlikeSound(token: string, soundId: number): Promise<{ message: string; sound: Sound } | null> {
  try {
    const url = `${API_BASE_URL}/sounds/${soundId}/like`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();

    // Handle ApiResponse format: { status: 200, data: { message: "...", sound: {...} } }
    if (result && typeof result === 'object' && 'data' in result && result.data) {
      return result.data as { message: string; sound: Sound };
    }

    // Handle direct response format
    if (result && typeof result === 'object' && 'message' in result && 'sound' in result) {
      return result as { message: string; sound: Sound };
    }

    console.error('Unexpected unlike response format:', result);
    return null;
  } catch (error) {
    console.error('Unlike sound error:', error);
    return null;
  }
}

export async function getSoundAudioUrl(soundId: number): Promise<string | null> {
  try {
    // Return the direct audio URL
    return `${API_BASE_URL}/sounds/${soundId}/audio`;
  } catch (error) {
    console.error('Get sound audio URL error:', error);
    return null;
  }
}

export async function updateSoundViews(soundId: number): Promise<{ views: number; sound_file: string } | null> {
  try {
    const url = `${API_BASE_URL}/sounds/views`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sound_id: soundId,
        id: soundId // Alternative field name
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();

    // Handle ApiResponse format: { status: 200, data: { views: ..., sound_file: ... } }
    if (result && typeof result === 'object' && 'data' in result && result.data) {
      return result.data as { views: number; sound_file: string };
    }

    // Handle direct response format
    if (result && typeof result === 'object' && 'views' in result && 'sound_file' in result) {
      return result as { views: number; sound_file: string };
    }

    console.error('Unexpected views update response format:', result);
    return null;
  } catch (error) {
    console.error('Update views error:', error);
    return null;
  }
}

export async function fetchUserLikes(token: string, page: number = 1, pageSize: number = 100): Promise<PaginatedResponse<Sound>> {
  const response = await fetchApiWithAuth<PaginatedResponse<Sound>>(
    `/sounds/user/likes?page=${page}&page_size=${pageSize}`,
    {
      method: 'GET',
    },
    token
  );

  if (response && 'results' in response) {
    return response;
  }

  return {
    count: 0,
    next: null,
    previous: null,
    results: []
  };
}

export async function forgotPassword(email: string): Promise<{ message: string } | null> {
  try {
    const url = `${API_BASE_URL}/user/forgot-password`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Forgot password failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Handle ApiResponse format: { status: 200, data: { message: "..." } }
    if (result && typeof result === 'object' && 'data' in result && result.data) {
      return result.data as { message: string };
    }

    // Handle direct response format
    if (result && typeof result === 'object' && 'message' in result) {
      return result as { message: string };
    }

    console.error('Unexpected forgot password response format:', result);
    return null;
  } catch (error: any) {
    console.error('Forgot password error:', error);
    throw error;
  }
}

export async function resetPassword(data: {
  uid: string;
  token: string;
  password: string;
}): Promise<{ message: string } | null> {
  try {
    const url = `${API_BASE_URL}/user/reset-password`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Reset password failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Handle ApiResponse format: { status: 200, data: { message: "..." } }
    if (result && typeof result === 'object' && 'data' in result && result.data) {
      return result.data as { message: string };
    }

    // Handle direct response format
    if (result && typeof result === 'object' && 'message' in result) {
      return result as { message: string };
    }

    console.error('Unexpected reset password response format:', result);
    return null;
  } catch (error: any) {
    console.error('Reset password error:', error);
    throw error;
  }
}

export interface Category {
  id: number;
  name: string;
  order: number;
  is_active: boolean;
  children: Category[];
  parent?: number | null;
  parent_id?: number | null;
  parent_name?: string | null;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const url = `${API_BASE_URL}/user/categories`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Categories fetch error: ${response.status} ${response.statusText}`);
      return [];
    }

    const result = await response.json();

    // Handle ApiResponse format: { status: 200, data: [...] }
    if (result && typeof result === 'object' && 'data' in result && Array.isArray(result.data)) {
      return result.data as Category[];
    }

    // Handle direct Array format: [...]
    if (Array.isArray(result)) {
      return result as Category[];
    }

    console.error('Unexpected categories response format:', result);
    return [];
  } catch (error) {
    console.error('Categories fetch error:', error);
    return [];
  }
}

export async function fetchCategoryById(id: number): Promise<Category | null> {
  return await fetchApi<Category>(`/user/categories/${id}`);
}

// User Authentication & Profile
export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  role?: number;
  role_name?: string;
  role_code?: string;
  is_active?: boolean;
  is_verified?: boolean;
  date_joined?: string;
  created_at?: string;
  last_login?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image?: string;
  metadata?: any;
  created_at: string;
  updated_at?: string;
  published_at?: string;
}

async function fetchApiWithAuth<T>(endpoint: string, options: RequestInit = {}, token?: string): Promise<T | null> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    return null;
  }
}

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}): Promise<AuthResponse | null> {
  try {
    const url = `${API_BASE_URL}/user/register`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Registration failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Check if result has the expected structure
    if (result && typeof result === 'object') {
      // Case 1: Standard ApiResponse format { status: 200, data: { ... } }
      if ('data' in result && result.data) {
        return result.data as AuthResponse;
      }
      // Case 2: Direct response format { token: "...", user: { ... } }
      if ('token' in result && 'user' in result) {
        return result as AuthResponse;
      }
    }

    console.error('Unexpected registration response format:', result);
    return null;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse | null> {
  try {
    const url = `${API_BASE_URL}/user/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Check if result has the expected structure
    if (result && typeof result === 'object') {
      // Case 1: Standard ApiResponse format { status: 200, data: { ... } }
      if ('data' in result && result.data) {
        return result.data as AuthResponse;
      }
      // Case 2: Direct response format { token: "...", user: { ... } }
      if ('token' in result && 'user' in result) {
        return result as AuthResponse;
      }
    }

    console.error('Unexpected login response format:', result);
    return null;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function getUserProfile(token: string): Promise<User | null> {
  try {
    const url = `${API_BASE_URL}/user/profile`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Profile fetch error: ${response.status} ${response.statusText}`);
      return null;
    }

    const result = await response.json();

    // Check if result has the expected structure
    if (result && typeof result === 'object') {
      // Case 1: Standard ApiResponse format { status: 200, data: { ... } }
      if ('data' in result && result.data) {
        return result.data as User;
      }
      // Case 2: Direct response format { id: ..., username: ..., ... }
      if ('id' in result && 'username' in result) {
        return result as User;
      }
    }

    console.error('Unexpected profile response format:', result);
    return null;
  } catch (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
}

export async function updateUserProfile(
  token: string,
  data: {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
  }
): Promise<User | null> {
  try {
    const url = `${API_BASE_URL}/user/profile`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Profile update error: ${response.status} ${response.statusText}`);
      return null;
    }

    const result = await response.json();

    // Check if result has the expected structure
    if (result && typeof result === 'object') {
      // Case 1: Standard ApiResponse format { status: 200, data: { user: ..., message: ... } }
      if ('data' in result && result.data && 'user' in result.data) {
        return result.data.user as User;
      }
      // Case 2: Direct response format { user: ..., message: ... }
      if ('user' in result && result.user) {
        return result.user as User;
      }
      // Case 3: Direct User format
      if ('id' in result && 'username' in result) {
        return result as User;
      }
    }

    console.error('Unexpected profile update response format:', result);
    return null;
  } catch (error) {
    console.error('Profile update error:', error);
    return null;
  }
}

export async function fetchUserFavorites(token: string, page: number = 1, pageSize: number = 100): Promise<PaginatedResponse<Sound>> {
  const response = await fetchApiWithAuth<PaginatedResponse<Sound>>(
    `/sounds/user/favorites?page=${page}&page_size=${pageSize}`,
    {
      method: 'GET',
    },
    token
  );

  if (response && 'results' in response) {
    return response;
  }

  return {
    count: 0,
    next: null,
    previous: null,
    results: []
  };
}

export async function fetchUserUploadedSounds(token: string, page: number = 1, pageSize: number = 100): Promise<PaginatedResponse<Sound>> {
  const response = await fetchApiWithAuth<PaginatedResponse<Sound>>(
    `/sounds/user/uploaded?page=${page}&page_size=${pageSize}`,
    {
      method: 'GET',
    },
    token
  );

  if (response && 'results' in response) {
    return response;
  }

  return {
    count: 0,
    next: null,
    previous: null,
    results: []
  };
}

export async function addToFavorites(token: string, soundId: number): Promise<boolean> {
  try {
    const url = `${API_BASE_URL}/sounds/${soundId}/favorite`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Add to favorites error:', error);
    return false;
  }
}

export async function removeFromFavorites(token: string, soundId: number): Promise<boolean> {
  try {
    const url = `${API_BASE_URL}/sounds/${soundId}/favorite`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Remove from favorites error:', error);
    return false;
  }
}

export async function uploadSound(
  token: string,
  formData: FormData
): Promise<Sound | null> {
  try {
    const url = `${API_BASE_URL}/sounds`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Handle different response formats
    if (data && typeof data === 'object') {
      // Case 1: Standard ApiResponse format { status: 200, data: { ... } }
      if ('data' in data && data.data) {
        return data.data as Sound;
      }
      // Case 2: Direct response format { id: 1, name: "...", ... }
      if ('id' in data && 'name' in data) {
        return data as Sound;
      }
    }

    console.warn('Unexpected upload response format:', data);
    return null;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
}

// Authentication token management
export const TOKEN_STORAGE_KEY = 'memes_soundboard_token';
export const USER_STORAGE_KEY = 'memes_soundboard_user';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
}

export function setStoredUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

export function logout(): void {
  removeAuthToken();
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthToken();
  if (!token) return null;

  const storedUser = getStoredUser();
  if (storedUser) return storedUser;

  // Fetch fresh user data from API
  const user = await getUserProfile(token);
  if (user) {
    setStoredUser(user);
  }
  return user;
}

// Error handling utilities
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export function handleApiError(error: any): ApiError {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: (error as any).status,
    };
  }

  if (typeof error === 'string') {
    return { message: error };
  }

  return {
    message: 'An unexpected error occurred',
    details: error
  };
}

// Blog endpoints
export async function fetchBlogs(params: {
  search?: string;
  page?: number;
  page_size?: number;
} = {}): Promise<PaginatedResponse<Blog>> {
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.append('search', params.search);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.page_size) queryParams.append('page_size', params.page_size.toString());

  const queryString = queryParams.toString();
  const data = await fetchApi<PaginatedResponse<Blog>>(`/user/blogs${queryString ? `?${queryString}` : ''}`);

  if (data && 'results' in data) {
    return data;
  }

  return { count: 0, next: null, previous: null, results: [] };
}

export async function fetchBlogById(id: number): Promise<Blog | null> {
  return await fetchApi<Blog>(`/user/blogs/${id}`);
}

export async function getBlogImageUrl(blogId: number, download: boolean = false): Promise<string | null> {
  try {
    const params = download ? '?download=true' : '';
    return `${API_BASE_URL}/user/blogs/${blogId}/image${params}`;
  } catch (error) {
    console.error('Get blog image URL error:', error);
    return null;
  }
}

