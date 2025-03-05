import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


import { createWebHistory, createRouter } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'; // Importar los hooks de Vue Router
import { ref, watch } from 'vue';


import altaPresupuesto from './components/altaPresupuesto.vue'
import listaPresupuestos from './components/listaPresupuestos.vue'
// Para recargar la página al navegar

const route = useRoute();

// Añadir un watcher para escuchar los cambios de ruta
watch(route, () => {
  router.replace({ path: '/about' }).then(() => {
    router.replace({ path: route.path }); // Restablecer la ruta para activar la recarga de la página
  });
});


const routes = [
  { path: '/', component: altaPresupuesto },
  { path: '/about', component:listaPresupuestos },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')

app.use(router)

app.mount('#app')