const API_BASE_URL = "http://192.168.1.67:8051/api/MemesSoundBoard";
async function fetchApi(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    const result = await response.json();
    if (result && typeof result === "object" && "data" in result && result.data) {
      return result.data;
    }
    return result;
  } catch (error) {
    console.error("API fetch error:", error);
    return null;
  }
}
async function fetchNewSounds(limit = 40) {
  const data = await fetchApi(`/sounds/new?page_size=${limit}`);
  if (data && "results" in data) {
    return data;
  }
  return { count: 0, next: null, previous: null, results: [] };
}
async function fetchTrendingSounds(limit = 40) {
  const data = await fetchApi(`/sounds/trending?page_size=${limit}`);
  if (data && "results" in data) {
    return data;
  }
  return { count: 0, next: null, previous: null, results: [] };
}
async function fetchSounds(params = {}) {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.page_size) queryParams.append("page_size", params.page_size.toString());
  if (params.category) queryParams.append("category", params.category.toString());
  if (params.tag) queryParams.append("tag", params.tag);
  if (params.search) queryParams.append("search", params.search);
  const queryString = queryParams.toString();
  const data = await fetchApi(`/sounds${queryString ? `?${queryString}` : ""}`);
  if (data && "results" in data) {
    return data;
  }
  return {
    count: 0,
    next: null,
    previous: null,
    results: []
  };
}
async function fetchSoundById(id) {
  try {
    const url = `${API_BASE_URL}/sounds/${id}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      console.error(`API error for sound ${id}: ${response.status} ${response.statusText}`);
      return null;
    }
    const responseData = await response.json();
    if (responseData && typeof responseData === "object" && "data" in responseData && responseData.data) {
      return responseData.data;
    }
    if (responseData && typeof responseData === "object" && "id" in responseData && "name" in responseData) {
      return responseData;
    }
    console.error(`Unexpected API response format for sound ${id}:`, JSON.stringify(responseData).substring(0, 200));
    return null;
  } catch (error) {
    console.error(`Error fetching sound ${id}:`, error);
    return null;
  }
}
async function searchSounds(query, page = 1, page_size = 40) {
  const data = await fetchApi(`/sounds/search?name=${encodeURIComponent(query)}&page=${page}&page_size=${page_size}`);
  if (data && "results" in data) {
    return data;
  }
  return { count: 0, next: null, previous: null, results: [] };
}
async function fetchCategories() {
  try {
    const url = `${API_BASE_URL}/user/categories`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      console.error(`Categories fetch error: ${response.status} ${response.statusText}`);
      return [];
    }
    const result = await response.json();
    if (result && typeof result === "object" && "data" in result && Array.isArray(result.data)) {
      return result.data;
    }
    if (Array.isArray(result)) {
      return result;
    }
    console.error("Unexpected categories response format:", result);
    return [];
  } catch (error) {
    console.error("Categories fetch error:", error);
    return [];
  }
}
async function fetchCategoryById(id) {
  return await fetchApi(`/user/categories/${id}`);
}

export { API_BASE_URL as A, fetchSounds as a, fetchNewSounds as b, fetchTrendingSounds as c, fetchCategories as d, fetchCategoryById as e, fetchSoundById as f, searchSounds as s };
