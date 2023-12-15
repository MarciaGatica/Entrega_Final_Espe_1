<template>
  <div>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" class="form-control input-rosa" required />
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input type="email" v-model="email" class="form-control input-rosa" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
  
        <input type="password" v-model="password" class="form-control input-rosa" required />
      </div>
      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="text" v-model="telefono" class="form-control input-rosa" required />
      </div>

      <div class="text-center">  
        <button type="submit" class="btn btn-primary boton-rosa">Registrarse</button>
      </div>
    </form>
  </div>
</template>

<script>
import authService from '@/services/auth.service.js';

export default {
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      telefono: '',
      foto_usuario: 'foto',  
    };
  },
  methods: {
    async registerUser() {
      try {
        const usuarioData = {
          nombre_usuario: this.nombre,
          email: this.email,
          clave: this.password,
          telefono: this.telefono,
          foto_usuario: 'foto', 
          isAdmin: this.$store.state.token ? true : false,  
        };

        const response = await authService.register(usuarioData);

        if (!this.$store.state.token) {
          await this.login();
        }

        this.nombre = '';
        this.email = '';
        this.password = '';
        this.telefono = '';
        this.foto_usuario = 'foto'; 

        alert('Usuario registrado exitosamente');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    },
    async login() {
      try {
        const response = await authService.login(this.email, this.password);

        this.$store.dispatch('setUserData', {
          userId: response.user._id,
          token: response.token,
          isAdmin: response.user.isAdmin,
        });
      } catch (error) {
        console.error('Error de autenticación durante el registro:', error);
      }
    },
  },
};
</script>

<style scoped>
 
.titulo-rosado {
  color: #CC7379;  
  text-align: center;  
  margin-bottom: 15px;  
}

.input-rosa {
  border: 2px solid #CC7379;  
  margin-bottom: 10px;  
}

.boton-rosa {
  background-color: #CC7379; 
  color: #fff;  
  border: 2px solid #CC7379; 
  width: 150px;  
  margin-top: 15px;  
}

</style>
