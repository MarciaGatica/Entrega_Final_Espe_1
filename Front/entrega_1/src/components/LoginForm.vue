<template>
  <div>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input type="email" v-model="email" class="form-control input-rosa" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" class="form-control input-rosa" required />
      </div>
      <div class="text-center"> <!-- Agregado un contenedor para centrar el botón -->
        <button type="submit" class="btn btn-primary boton-rosa">Iniciar sesión</button>
      </div>
    </form>

    <div v-if="message" :class="{ 'text-success': isSuccess, 'text-danger': !isSuccess }">
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: '',
      email: '',
      telefono: '',
      foto_usuario: '',
      password: '',
      message: '',
      isSuccess: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          clave: this.password,
        });

        const { user, token } = response.data;

        
        this.$store.dispatch('setUserData', {
          userId: user._id,
          token,
          isAdmin: user.isAdmin,
        });
 
        this.isSuccess = true;
        this.message = 'Inicio de sesión exitoso';

        
        this.$emit('login');
      } catch (error) {
        console.error('Error de autenticación:', error);

  
        this.isSuccess = false;
        this.message = 'Error al iniciar sesión. Verifica tus credenciales';
 
      }
    },
  },
};
</script>

<style scoped>
 
.form-group {
  margin-bottom: 15px;
}

.input-rosa {
  border: 2px solid #CC7379;  
}

.boton-rosa {
  background-color: #CC7379;  
  color: #fff;  
  border: 2px solid #CC7379;  
}

.text-success {
  color: green;
}

.text-danger {
  color: red;
}
</style>
