import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio', 
      component: () => import('../views/Inicio.vue'), 
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('../views/Catalogo.vue')
    },
  
   
  ]
})

export default router
