<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <h2 class="modal-title">Editar Producto</h2>

      <label for="id">ID:</label>
      <input v-model="productoEditado._id" type="text" id="id" readonly class="no-border" />

      <label for="nombre">Nombre:</label>
      <input v-model="productoEditado.nombre_producto" type="text" id="nombre" required class="with-border" />

      <label for="precio">Precio:</label>
      <input v-model="productoEditado.precio" type="number" id="precio" required class="with-border" />

 
      <label for="stock">Stock:</label>
      <input v-model="productoEditado.stock" type="number" id="stock" required class="with-border" />

      <div class="botones-container">
        <button @click="guardarEdicion" class="boton-rosado">Guardar</button>
        <button @click="cerrar" class="boton-rosado">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    producto: Object,
  },
  data() {
    return {
      productoEditado: null,
    };
  },
  watch: {
    producto: {
      immediate: true,
      handler(newVal) {
        this.productoEditado = { ...newVal };
      },
    },
  },
  methods: {
    guardarEdicion() {
      this.$emit("guardar", this.productoEditado);
      this.cerrar();
    },
    cerrar() {
      this.$emit("cerrar");
    },
  },
};
</script>

<style scoped>
 
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 60px;
  border-radius: 8px;
  width: 50%;
  box-sizing: border-box;
  border: 2px solid #CC7379; 
}

.modal-title {
  text-align: center;
  color: #CC7379;  
  font-size: 35px;  
  margin-bottom: 20px;  
}

.no-border {
  border: none;  
  margin-bottom: 20px; 
}

.with-border {
  border: 2px solid #CC7379; 
  border-radius: 4px; 
  box-sizing: border-box;  
  margin-bottom: 20px;  
}

.botones-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;  
}

.boton-rosado {
  background-color: #CC7379;
  color: #fff;
  padding: 12px 24px;  
  font-size: 18px;  
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 40%;
  box-sizing: border-box;
}

.boton-rosado:hover {
  background-color: #B6606D;  
}
</style>
