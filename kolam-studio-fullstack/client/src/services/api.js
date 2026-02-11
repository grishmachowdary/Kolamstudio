/**
 * API SERVICE
 * 
 * Centralized API calls to backend.
 * All HTTP requests go through here.
 */

import axios from 'axios'

// Base URL for API
const API_URL = '/api'

// Set default headers
axios.defaults.headers.common['Content-Type'] = 'application/json'

/**
 * AUTH API
 */
export const authAPI = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  getMe: () => axios.get(`${API_URL}/auth/me`),
  updateProfile: (data) => axios.put(`${API_URL}/auth/profile`, data)
}

/**
 * KOLAM API
 */
export const kolamAPI = {
  getAll: (params) => axios.get(`${API_URL}/kolams`, { params }),
  getOne: (id) => axios.get(`${API_URL}/kolams/${id}`),
  create: (data) => axios.post(`${API_URL}/kolams`, data),
  update: (id, data) => axios.put(`${API_URL}/kolams/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/kolams/${id}`),
  like: (id) => axios.post(`${API_URL}/kolams/${id}/like`),
  getUserKolams: (userId) => axios.get(`${API_URL}/kolams/user/${userId}`),
  getMyKolams: () => axios.get(`${API_URL}/kolams/my/kolams`)
}

/**
 * COMMENT API
 */
export const commentAPI = {
  getComments: (kolamId) => axios.get(`${API_URL}/comments/kolam/${kolamId}`),
  addComment: (kolamId, data) => axios.post(`${API_URL}/comments/kolam/${kolamId}`, data),
  deleteComment: (id) => axios.delete(`${API_URL}/comments/${id}`)
}
