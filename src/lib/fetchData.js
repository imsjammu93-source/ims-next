// SIMPLE & PREDICTABLE: API_BASE_URL should include the /api folder
// Set this in your .env: NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/ims-server/api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/ims-server/api';

const getUrl = (endpoint) => {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

/**
 * GET requests - Clean and simple
 */
async function fetchInternal(endpoint, useCache = false) {
  try {
    const url = getUrl(endpoint);
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions = { headers };
    if (useCache) {
      fetchOptions.next = { revalidate: 600 }; // 10 minutes cache
    } else {
      fetchOptions.cache = 'no-store';
    }

    const res = await fetch(url, fetchOptions);
    if (!res.ok) return [];
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.error(`Fetch Error:`, err);
    return [];
  }
}

/**
 * POST/PUT/DELETE requests - Handles Auth and JSON/FormData
 */
async function postInternal(endpoint, body, method = 'POST') {
  try {
    const url = getUrl(endpoint);
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const fetchOptions = {
      method,
      headers: headers,
      body: body instanceof FormData ? body : JSON.stringify(body)
    };
    if (!(body instanceof FormData)) headers['Content-Type'] = 'application/json';

    const res = await fetch(url, fetchOptions);
    const result = await res.json();

    // Handle session expiry
    if (result.message && (result.message.toLowerCase().includes('token') || result.message.toLowerCase().includes('unauthorized'))) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      }
    }
    return result;
  } catch (err) {
    console.error(`Post Error:`, err);
    return { success: false, message: "Connection failed" };
  }
}

/* ==========================================
   MINIMAL EXPORTS
   ========================================== */
export const getBlogs = (catId, all = 0, limit = null) => fetchInternal(`/blogs/get.php?all=${all}${catId ? '&category_id='+catId : ''}${limit ? '&limit='+limit : ''}`, true);
export const getBlogBySlug = (slug) => fetchInternal(`/blogs/get.php?slug=${slug}`, true).then(data => data && data.length > 0 ? data[0] : null);
export const getBlogCategories = (all = 0) => fetchInternal(`/blogs/categories/get.php?all=${all}`, true);
export const getEvents = (all = 0) => fetchInternal(`/events/get.php?all=${all}`, true);
export const getEventBySlug = (slug) => fetchInternal(`/events/get.php?slug=${slug}`, true).then(data => data && data.length > 0 ? data[0] : null);

export const getFaculty = (all = 0, dept = '') => fetchInternal(`/faculty/get.php?all=${all}${dept ? '&department='+dept : ''}`, true);
export const addFaculty = (data) => postInternal('/faculty/add.php', data);
export const updateFaculty = (data) => postInternal('/faculty/update.php', data);
export const deleteFaculty = (id, type = 'soft') => postInternal('/faculty/delete.php', { id, type });

export const addBlog = (data) => postInternal('/blogs/add.php', data);
export const updateBlog = (data) => postInternal('/blogs/update.php', data);
export const deleteBlog = (id, type = 'soft') => postInternal('/blogs/delete.php', { id, type });

export const addCategory = (data) => postInternal('/blogs/categories/add.php', data);
export const updateCategory = (data) => postInternal('/blogs/categories/update.php', data);
export const deleteCategory = (id, type = 'soft') => postInternal('/blogs/categories/delete.php', { id, type });

export const addEvent = (data) => postInternal('/events/add.php', data);
export const updateEvent = (data) => postInternal('/events/update.php', data);
export const deleteEvent = (id, type = 'soft') => postInternal('/events/delete.php', { id, type });

export const getContactMessages = (filter = 'all') => fetchInternal(`/contact_messages/get.php?filter=${filter}`);
export const updateMessageStatus = (id, is_read) => postInternal('/contact_messages/update_status.php', { id, is_read });
export const deleteMessage = (id, type = 'soft') => postInternal('/contact_messages/delete.php', { id, type });

export const getAdmissions = (filter = 'all') => fetchInternal(`/admissions/get.php?filter=${filter}`);
export const updateAdmissionStatus = (params) => postInternal('/admissions/update_status.php', params);
export const deleteAdmission = (id, type = 'soft') => postInternal('/admissions/delete.php', { id, type });

export const getAdmissionSettings = () => fetchInternal('/settings/get_admission_settings.php');
export const updateAdmissionSettings = (data) => postInternal('/settings/update_admission_settings.php', data);

// User Management
export const getUsers = () => fetchInternal('/users/get.php');
export const addUser = (data) => postInternal('/users/add.php', data);
export const updateUser = (data) => postInternal('/users/update.php', data);
export const deleteUser = (id) => postInternal('/users/delete.php', { id });
