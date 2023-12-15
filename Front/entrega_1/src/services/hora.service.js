
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/hora/';

const horaService = {
  async crearHora(data, token) {
    try {
      const response = await axios.post(`${API_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default horaService;