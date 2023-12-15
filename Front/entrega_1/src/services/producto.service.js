// producto.service.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/productos/'; 
export default {
  async crearProducto(productoData, token) {
    try {
      const response = await axios.post(`${API_URL}`, productoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async listarProductos() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async borrarProducto(productoId, token) {
    try {
      const response = await axios.delete(`${API_URL}/${productoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async editarProducto(productoId, productoData, token) {
    try {
      const response = await axios.put(`${API_URL}${productoId}`, productoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async obtenerUnProducto(productoId) {
    try {
      const response = await axios.get(`${API_URL}/${productoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};