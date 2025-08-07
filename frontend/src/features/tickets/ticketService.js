// src/features/tickets/ticketService.js
import API from '../../axiosConfig'

const API_URL = '/api/tickets'

export const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await API.post(API_URL, ticketData, config)
  return response.data
}

export const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await API.get(API_URL, config)
  return response.data
}

export const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await API.get(`${API_URL}/${ticketId}`, config)
  return response.data
}

export const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await API.put(`${API_URL}/${ticketId}`, { status: 'closed' }, config)
  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
}

export default ticketService
