<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="@/assets/logo_gato.png" alt="Logo" width="50" height="50">
          <span class="titulo">Veteri Sanos</span>
        </a>

        <div class="btn-group btn-group-lg" role="group">
          <!-- Botones cuando hay token y isAdmin=true (Administrador) -->
          <template v-if="token && isAdmin">
            <button @click="openHorasAgendadasModal">Ver Horas</button>
            <button @click="openCrearProductoPopup">Crear Producto</button>
            <button @click="openRegisterPopup">Crear Trabajador</button>
            <button @click="logout">Salir</button>
          </template>

          <!-- Botones cuando hay token y isAdmin=false (Cliente) -->
          <template v-else-if="token && !isAdmin">
            <button @click="openHorasAgendadasModal">Horas Agendadas</button>
            <button @click="openAgendarHoraModal">Agendar Hora</button>
            <button @click="logout">Salir</button>
          </template>

          <!-- Botones cuando no hay token (Publico General)-->
          <template v-else>
            <button @click="openLoginPopup">Iniciar Sesión</button>
            <button @click="openRegisterPopup">Registrarse</button>
          </template>
        </div>

        <LoginPopup ref="loginPopup" />
        <RegisterPopup ref="registerPopup" />
        <CrearProductoPopUp ref="crearProductoPopUp" />
        <AgendarHoraModal ref="agendarHoraModal" />
        <HorasAgendadasModal ref="horasAgendadasModal" />
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoginPopup from '../components/LoginPopup.vue';
import RegisterPopup from '../components/RegisterPopup.vue';
import CrearProductoPopUp from './CrearProductoPopUp.vue';
import AgendarHoraModal from './AgendarHoraModal.vue';
import HorasAgendadasModal from './HorasAgendadasModal.vue';

export default {
  components: {
    LoginPopup,
    RegisterPopup,
    CrearProductoPopUp,
    AgendarHoraModal,
    HorasAgendadasModal,
  },
  computed: {
    ...mapState(['token', 'isAdmin']),
  },
  methods: {
    openHorasAgendadasModal() {
      this.$refs.horasAgendadasModal.openModal();
    },
    openAgendarHoraModal() {
      this.$refs.agendarHoraModal.openModal();
    },
    openLoginPopup() {
      this.$refs.loginPopup.openPopup();
    },
    openRegisterPopup() {
      this.$refs.registerPopup.openPopup();
    },
    openCrearProductoPopup() {
      this.$refs.crearProductoPopUp.openPopup();
    },
    logout() {
      this.$store.dispatch('clearUserData');
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
.titulo {
  margin-right: 50%;
  color: aliceblue;
}

.logo {
  width: 4%;
}

.btn-group {
  margin-right: 5%;
  margin-bottom: 1%;
  margin-top: 1%;
}

.navbar {
  background-color: #CC7379;
}

.btn-group button {
  background-color: #ffffffff;
  border: 1px solid #ffffffff;
  color: black;
  padding: 10px 24px;
  cursor: pointer;
  float: left;
}

.btn-group button:not(:last-child) {
  border-right: none;
}

.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

.btn-group button:hover {
  color: black;
  background-color: #CC7379;
}
</style>
