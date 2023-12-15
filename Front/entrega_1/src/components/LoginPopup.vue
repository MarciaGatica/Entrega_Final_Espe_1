<template>
  <div v-if="showPopup" class="modal fade show" tabindex="-1" role="dialog" style="display: block; top: 100px;">
    <div class="modal-dialog" role="document">
      <div class="modal-content modal-rosado">
        <div class="modal-header modal-header-rosado">
          <h5 class="modal-title modal-title-rosado">Iniciar sesión</h5>
          <button type="button" class="close close-button" @click="closePopup" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <LoginForm @login="handleLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    handleLogin() {
      this.closePopup();
    },
  },
};
</script>

<style scoped> 
.modal-rosado {
  border: 2px solid #a84340; 
}



.modal-title-rosado {
  color: #a84340;  
}
.close-button {
  color: #ffffff;  
  opacity: 1;  
  font-size: 20px;  
  background-color: #a84340;
  border-radius: 40px;
  height: 40px;
  width:40px;
  text-align: center;
}

.close-button:hover {
  color: #B6606D;  
}
</style>
