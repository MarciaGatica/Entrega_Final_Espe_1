<template>
    <div v-if="showModal" class="agendar-hora-modal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Agendar Hora</h5>
                <button type="button" class="close" @click="closeModal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                <div class="form-group">
                    <label for="fecha">Fecha:</label>
                    <input type="date" id="fecha" v-model="fecha" required style="width: 80%;">
                </div>

                <div class="form-group">
                    <label for="hora">Hora:</label>
                    <select v-model="hora" required style="width: 80%;">
                        <option value="1">8:00 - 9:00</option>
                        <option value="2">9:00 - 10:00</option>
                        <option value="3">10:00 - 11:00</option>
                        <option value="4">11:00 - 12:00</option>
                        <option value="5">12:00 - 13:00</option>
                        <option value="6">13:00 - 14:00</option>
                        <option value="7">14:00 - 15:00</option>
                        <option value="8">15:00 - 16:00</option>
                        <option value="9">16:00 - 17:00</option>

                    </select>
                </div>

                <div class="form-group">
                    <label for="nombreMascota">Nombre de la Mascota:</label>
                    <input type="text" id="nombreMascota" v-model="nombreMascota" required style="width: 80%;">
                </div>

                <div class="form-group">
                    <label for="especie">Especie:</label>
                    <input type="text" id="especie" v-model="especie" required style="width: 80%;">
                </div>

                <div class="form-group">
                    <label for="encargado">Nombre del Encargado:</label>
                    <input type="text" id="encargado" v-model="encargado" required style="width: 80%;">
                </div>

                <div class="form-group">
                    <label for="motivo">Motivo de la Consulta (opcional):</label>
                    <textarea id="motivo" v-model="motivo" style="width: 80%;"></textarea>
                </div>


                <button @click="agendarHora" class="agendar-btn">Agendar Hora</button>
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
            fecha: '',
            hora: 0,
            nombreMascota: '',
            especie: '',
            encargado: '',
            motivo: '',
        };
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
      this.showModal = false;
      this.resetCampos();  
    },
    resetCampos() {
    
      this.fecha = '';
      this.hora = 0;
      this.nombreMascota = '';
      this.especie = '';
      this.encargado = '';
      this.motivo = '';
    },
        async agendarHora() {
            try {
                const token = this.$store.getters.getToken;

                if (!token) {
                    console.error('Token no disponible');
                    return;
                }

                const data = {
                    fecha: this.fecha,
                    hora: this.hora,
                    nombre_mascota: this.nombreMascota,
                    especie: this.especie,
                    encargado: this.encargado,
                    motivo: this.motivo,
                    id_usuario: this.$store.getters.getUserId,
                };


                const response = await axios.post('http://127.0.0.1:3000/hora/', data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Hora agendada:', response.data);
                alert('Hora agendada con éxito');

                this.closeModal();
            } catch (error) {
                console.error('Error al agendar la hora:', error);

                if (error.response) {
                    console.error('Respuesta del servidor:', error.response.data);
                } else if (error.request) {
                    console.error('No se recibió respuesta del servidor');
                } else {
                    console.error('Error de configuración:', error.message);
                }
            }
        },
    },
};
</script>

<style scoped>
.agendar-hora-modal {
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

.modal-body {}

.form-group {
    margin-bottom: 15px;

}

.form-group label {
    display: block;
    margin-bottom: 5px;

}

.agendar-btn {
    width: 80%;

    margin: 0 auto;

    padding: 15px;

    font-size: 16px;

    background-color: #CC7379;

    color: #ffffff;

    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
  