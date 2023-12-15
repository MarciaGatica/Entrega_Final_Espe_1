<template>
  <div v-if="showModal" class="horas-agendadas-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Horas Agendadas</h5>
        <button type="button" class="close" @click="closeModal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
 
        <ul class="scrollable-list">
          <li v-for="hora in filteredHoras" :key="hora._id">
            <strong>Encargado:</strong> {{ hora.encargado }}<br>
            <strong>Fecha:</strong> {{ formatFecha(hora.fecha) }}<br>
            <strong>Hora:</strong> {{ getTextForHour(hora.hora) }}<br>
            <strong>Nombre de la Mascota:</strong> {{ hora.nombre_mascota }}<br>
            <strong>Especie:</strong> {{ hora.especie }}<br>
            <strong>Motivo:</strong> {{ hora.motivo }}<br><br>
          
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showModal: false,
      horas: [],
    };
  },
  computed: {
    filteredHoras() {
      const userId = this.$store.getters.getUserId;
      const isAdmin = this.$store.getters.getIsAdmin;

      if (isAdmin) {
     
        return this.horas;
      } else {
       
        return this.horas.filter(hora => hora.id_usuario === userId);
      }
    },
  },
  methods: {
    openModal() {
 
      axios.get('http://127.0.0.1:3000/hora/')
        .then(response => {
          this.horas = response.data.hora; 
          this.showModal = true;
        })
        .catch(error => {
          console.error('Error al obtener las horas agendadas:', error);
        });
    },
    closeModal() {
      this.showModal = false;
    },
    getTextForHour(hourValue) {
 
      switch (hourValue) {
        case 1:
          return '8:00 - 9:00';
        case 2:
        return '9:00 - 10:00';
        case 3:
        return '10:00 - 11:00';
        case 4:
        return '11:00 - 12:00';
        case 5:
        return '12:00 - 13:00';
        case 6:
        return '13:00 - 14:00';
        case 7:
        return '14:00 - 15:00';
        case 8:
        return '15:00 - 16:00';
        case 9:
        return '16:00 - 17:00';
        default:
          return 'Texto por defecto';
      }
    },
    formatFecha(fecha) {
     
      const date = new Date(fecha);
      return date.toLocaleDateString(); 
    },
  },
};
</script>

  <style scoped>
  .scrollable-list {
  max-height: 300px; 
  overflow-y: auto;
}
  .horas-agendadas-modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    width: 40%;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border: 2px solid #CC7379;
    margin-left: 15px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .modal-title {
  margin: 0;
  text-align: center;
  color: #CC7379;
}
  .close {
    cursor: pointer;
  }
  
  .modal-body {
    margin-top: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>
  