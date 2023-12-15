<template>
  <div>
    <Navbar />
    <Catalogo/>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Catalogo from '@/views/Catalogo.vue';


export default {
  components: {
    Navbar,
    Catalogo,
  
  },

};
</script>

<style scoped>
</style>
