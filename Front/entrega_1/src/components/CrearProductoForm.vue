<template>
  <div>
    <form @submit.prevent="createProduct" class="form-container">
      <div class="form-group">
        <label for="nombre">Nombre del Producto:</label>
        <input type="text" v-model="nombre" class="form-control input-rosa" required />
      </div>
      <div class="form-group">
        <label for="precio">Precio:</label>
        <input type="number" v-model="precio" class="form-control input-rosa" required />
      </div>
      <div class="form-group">
        <label for="stock">Stock:</label>
        <input type="number" v-model="stock" class="form-control input-rosa" required />
      </div>
      <div class="form-group">
        <label for="foto">Seleccionar Foto:</label>
        <input type="file" ref="fileInput" @change="handleFileChange" class="form-control input-rosa" accept="image/*" required />
      </div>
      <button type="button" @click="createProduct" class="btn boton-rosa">Crear Producto</button>
    </form>
  </div>
</template>

<script>
import productoService from '../services/producto.service';

export default {
  data() {
    return {
      nombre: '',
      precio: 0,
      stock: 0,
      foto: null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      
      if (file) {
        this.convertFileToBase64(file);
      }
    },
    convertFileToBase64(file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.foto = reader.result;
      };

      reader.readAsDataURL(file);
    },
    async createProduct() {
      try {
        const nuevoProducto = {
          nombre_producto: this.nombre,
          precio: this.precio,
          stock: this.stock,
          foto_producto: this.foto,
        };

        const token = this.$store.state.token;

        const response = await productoService.crearProducto(nuevoProducto, token);

        this.nombre = '';
        this.precio = 0;
        this.stock = 0;
        this.foto = null;

        alert('Producto creado exitosamente');

        this.$emit('product-registered', { productoCreado: response });
        this.$emit('new-product-added'); 
        this.$store.dispatch('setProductoCreado', !this.$store.getters.getProductoCreado);


      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
 
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.input-rosa {
  border: 2px solid #CC7379;  
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
}

.boton-rosa {
  background-color: #CC7379;  
  color: #fff;  
  border: 2px solid #CC7379;  
  border-radius: 4px;
  padding: 12px;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;  
  display: block;
}

.boton-rosa:hover {
  background-color: #B6606D;  
}
</style>
