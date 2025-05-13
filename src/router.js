import { createRouter, createWebHistory } from 'vue-router';
import TablaHome from './components/TablaHome.vue';
import TablaUsuarios from './components/TablaUsuarios.vue';
import AcercaDe from './components/AcercaDe.vue';
import DatosClinicos from './components/DatosClinicos.vue';
import HabitosVida from './components/HabitosVida.vue';
import DatosEsteticos from './components/DatosEsteticos.vue';
import DatosPiel from './components/DatosPiel.vue';
import ContraIndicaciones from './components/ContraIndicaciones.vue';
import TrataMientos from './components/TrataMientos.vue';
import CitasEstetica from './components/CitasEstetica.vue';
import GestionUsuarios from './components/GestionCuentas.vue';

// Definir las rutas

const routes = [
  { path: '/', component: TablaHome }, 
  { path: '/tabla-usuarios', component: TablaUsuarios }, 
  { path: '/datos-clinicos', component: DatosClinicos },
  { path: '/habitos-vida', component: HabitosVida },
  { path: '/datos-esteticos', component: DatosEsteticos },
  { path: '/datos-piel', component: DatosPiel },
  { path: '/contra-indicaciones', component: ContraIndicaciones},
  { path: '/tratamientos', component: TrataMientos },
  { path: '/citas', component: CitasEstetica},
  { path: '/acerca', component: AcercaDe},  
  { path: '/gestionar-cuentas', component: GestionUsuarios}, 
  // Otras rutas
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
