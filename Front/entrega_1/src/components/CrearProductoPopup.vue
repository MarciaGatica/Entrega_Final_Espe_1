<template>
  <div v-if="showPopup" class="modal fade show" tabindex="-1" role="dialog" style="display: block; top: 100px;">
    <div class="modal-dialog" role="document">
      <div class="modal-content modal-rosado">
        <div class="modal-header modal-header-rosado">
          <h5 class="modal-title modal-title-rosado">Crear Producto</h5>
          <button type="button" class="close close-button" @click="closePopup" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <CrearProductoForm @product-registered="handleProductRegistered" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CrearProductoForm from './CrearProductoForm.vue';

export default {
  components: {
    CrearProductoForm,
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
    handleProductRegistered() {
      this.closePopup();
      console.log('Emitiendo evento new-product-added');
      this.$emit('new-product-added');
    },
  },
};
</script>

<style scoped>
 
.modal-rosado {
  border: 2px solid #CC7379;  
}

.modal-title-rosado {
  color: #CC7379;  
}

.close-button {
  color: #ffffff; 
  opacity: 1;  
  font-size: 20px;  
  background-color: #CC7379;
  border-radius: 40px;
  height: 40px;
  width: 40px;
  text-align: center;
}

.close-button:hover {
  color: #B6606D;  
}
</style>
