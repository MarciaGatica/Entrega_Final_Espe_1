 
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/auth';  

export default {
  async login(email, clave) {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, clave });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async register(usuarioData) {
    try {
      const response = await axios.post(`${API_URL}/register`, usuarioData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
