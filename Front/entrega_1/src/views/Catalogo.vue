<template>
  <div class="catalog" :key="shouldReload">
    <h1 class="titulo">Catálogo</h1>
    <div class="contenedor">

      <div class="card" v-for="(producto, index) in productos" :key="index">
        <img :src="getImagenSrc(producto.foto_producto)" class="card-img-top" @error="handleImageError" />
        <div class="card-body">
          <h5 class="card-title">{{ producto.nombre_producto }}</h5>
          <h1>{{ producto.precio }}</h1>
           
          <button @click="agregarAlCarrito(producto)" v-if="!estado" class="boton-carrito">
            Agregar Al carrito
          </button>
          <template v-else>
            <button @click="abrirEditarModal(producto)" class="boton-rosado">
              Editar Producto
            </button>
            <button @click="eliminarProducto(producto)" class="boton-rosado">
              Eliminar Producto
            </button>
          </template>
        </div>
      </div>
    </div>
   


    <EditarProductoModal :producto="productoEditando" :visible="editarProductoModalVisible" @cerrar="cerrarEditarModal"
      @guardar="guardarEdicion" />
  </div>
</template>
  
<script>
import { ref, onMounted, watch } from "vue";
import productoService from "../services/producto.service";
import { useStore } from "vuex";
import EditarProductoModal from "../components/EditarProductoModal.vue";
import Swal from 'sweetalert2';



export default {
  setup() {
    const store = useStore();
    const productos = ref([]);
    const shouldReload = ref(false);
    const estado = ref(false); 
    const editarProductoModalVisible = ref(false);
    const productoEditando = ref(null);




    onMounted(async () => {
      await listarProductos();
    });

    const listarProductos = async () => {
      try {
        console.log('taos cargando prod');
        const response = await productoService.listarProductos();
        productos.value = response.productos;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    const getImagenSrc = (base64String) => {
      return `${base64String}`;
    };

    const agregarAlCarrito = (producto) => {
      console.log("Producto agregado al carrito:", producto);
    };

    const handleImageError = (event) => {
      console.error("Error al cargar la imagen:", event);
    };



    const eliminarProducto = async (producto) => {
      
      const confirmacion = await Swal.fire({
        title: `¿Estás seguro de eliminar el producto "${producto.nombre_producto}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#CC7379',
        cancelButtonColor: '#6C757D',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      });

      
      if (confirmacion.isConfirmed) {
        try {
           
          await productoService.borrarProducto(producto._id, store.getters.getToken);
          console.log("Producto eliminado:", producto);

           
          await listarProductos();
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      }
    };


    const abrirEditarModal = (producto) => {
      productoEditando.value = { ...producto };  
      console.log(productoEditando);
      editarProductoModalVisible.value = true;
    };

    const cerrarEditarModal = () => {
      productoEditando.value = null;  
      editarProductoModalVisible.value = false;
    };

    const guardarEdicion = async (productoEditado) => {
      console.log('id', productoEditado._id);
      console.log('cambios', productoEditado);
      console.log('token', store.getters.getToken);
     
      try {
        await productoService.editarProducto(productoEditado._id, productoEditado, store.getters.getToken);
        console.log("Producto editado:", productoEditado);
        await listarProductos();  
      } catch (error) {
        console.log("Producto editado:", productoEditado);
        console.error("Error al editar el producto:", error);
      }

      cerrarEditarModal();  
    };
   
  
    watch(
      () => store.getters.getIsAdmin,
      (newIsAdmin, oldIsAdmin) => {
        estado.value = newIsAdmin;  
        console.log("Nuevo estado de isAdmin en Catalogo:", newIsAdmin);
        shouldReload.value = !shouldReload.value;
      }
      
    );
    watch(
      () => store.getters.getProductoCreado,
      async (newProductoCreado, oldProductoCreado) => {
        
        console.log("Nuevo estado de productoCreado en Catalogo:", newProductoCreado);
        await listarProductos();
       
      }
    );

    return {
      productos,
      shouldReload,
  
      getImagenSrc,
      agregarAlCarrito,
      handleImageError,
      shouldReload,
      editarProductoModalVisible,
      productoEditando,
      abrirEditarModal,
      cerrarEditarModal,
      guardarEdicion,
      eliminarProducto,
      isAdmin: store.getters.getIsAdmin,
      estado, 
    };
  },
  components: {
    EditarProductoModal, 

  },methods: {
    
  },
};
</script>
  
  
<style scoped>
.catalog {
  padding: 100px;
}

.titulo {
  text-align: center;
  color: #CC7379;
  font-size: 50px;
  margin-bottom: 40px;
 
}

.contenedor {
  width: 100%;
  height: auto;
  display: flex !important;
  flex-wrap: wrap;
  text-align: center;
}


.card {
  margin: 2%;
  width: 20%;
  border: 2px solid #CC7379;
  border-radius: 8px;
  box-sizing: border-box;

}

.card .card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boton-carrito,
.boton-rosado {
  background-color: #CC7379;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 80%;
  margin-top: 10px;
  box-sizing: border-box;
}

.boton-carrito:hover,
.boton-rosado:hover {
  background-color: #B6606D;
}

.image-container {
  width: 100%;
  height: 60%;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}</style>