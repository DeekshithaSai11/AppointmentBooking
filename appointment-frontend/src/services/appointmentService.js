import api from './api';

export const appointmentService = {
  getPlaces: async () => {
    const response = await api.get('/api/places');
    return response.data;
  },

  createPlace: async (placeData) => {
    const response = await api.post('/api/places', placeData);
    return response.data;
  },

  getSlots: async () => {
    const response = await api.get('/api/slots');
    return response.data;
  },

  getAppointments: async () => {
    const response = await api.get('/api/appointments');
    return response.data;
  },

  bookAppointment: async (appointmentData) => {
    const response = await api.post('/api/appointments', appointmentData);
    return response.data;
  },

  getAdminUsers: async () => {
    const response = await api.get('/api/admin/users');
    return response.data;
  },

  getAdminAppointments: async () => {
    const response = await api.get('/api/admin/appointments');
    return response.data;
  },

  deleteAppointment: async (id) => {
    const response = await api.delete(`/api/admin/appointments/${id}`);
    return response.data;
  }
};