<template>
  <header class="header-container">
    <div class="brand-container">
      <span class="brand-text fs-4">✨ Estética Teis ✨</span>
    </div>
    <nav class="navbar navbar-expand-lg custom-navbar">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <!-- Siempre visible -->
            <li class="nav-item" v-if="!logueada">
              <router-link to="/" class="nav-link" exact-active-class="active-link">Inicio</router-link>
            </li>

            <!-- Visible solo si hay sesión iniciada -->
            <template v-if="logueada">
              <li class="nav-item">
                <router-link to="/tabla-usuarios" class="nav-link" exact-active-class="active-link">Usuarios</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/datos-clinicos" class="nav-link" exact-active-class="active-link">Datos Clínicos</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/habitos-vida" class="nav-link" exact-active-class="active-link">Hábitos de Vida</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/datos-esteticos" class="nav-link" exact-active-class="active-link">Datos Estéticos</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/datos-piel" class="nav-link" exact-active-class="active-link">Datos Piel</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/contra-indicaciones" class="nav-link" exact-active-class="active-link">Contraindicaciones</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/tratamientos" class="nav-link" exact-active-class="active-link">Tratamientos</router-link>
              </li>
              <!-- Solo visible para admin-admin -->
              <li class="nav-item" v-if="nombre === 'admin'">
                <router-link to="/gestionar-cuentas" class="nav-link" exact-active-class="active-link">Accesos</router-link>
              </li>
              
              <!-- Menú desplegable de usuario -->
              <li class="nav-item dropdown ms-4">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  <i class="bi bi-person-circle"></i> {{ nombre }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item estilo" href="#" @click="cerrarSesion">Cerrar sesión</a>
                  </li>
                </ul>
              </li>

            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>


<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const router = useRouter();

    const logueada = computed(() => store.getters.getAdminId !== null);
    const nombre = computed(() => store.getters.getAdminNombre);
    const tipo = computed(() => store.getters.getAdminTipo);
    const idAdmin = computed(() => store.getters.getAdminId); 

    const cerrarSesion = () => {
      store.dispatch('clearAdmin');
      router.push('/');
    };

    return {
      logueada,
      nombre,
      tipo,
      idAdmin,
      cerrarSesion
    };
  }
};
</script>

<style scoped>
/* Fuente personalizada */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

/* Contenedor del header */
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Contenedor superior con degradado vertical */
.brand-container {
  background: linear-gradient(to bottom, #ffdde1, #ffffff); /* Degradado de rosa a blanco */
  width: 100%;
  text-align: center;
  padding: 6px 0;
}

.brand-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: bold;
  color: #6a0572; /* Color original del texto */
}

/* Barra de navegación principal */
.custom-navbar {
  background: linear-gradient(to right, #ffffff, #ffdde1, #ffffff); /* Degradado de blanco a rosa hacia los extremos */
  padding: 5px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Estilos de los enlaces */
.navbar-nav .nav-link{
  font-size: 1.1rem;
  font-weight: 500;
  color: #6a0572 !important; /* Cambié el color a #6a0572, igual que el de la marca */
  transition: all 0.3s ease-in-out;
  padding-top: 5px;
  padding-bottom: 5px;
}

/* Aumentar tamaño al pasar el ratón */
.navbar-nav .nav-link:hover {
  color: #f8f9fa !important;
  text-decoration: underline;
  transform: scale(1.2);
}

/* Estilos cuando el enlace está activo (seleccionado) */
.navbar-nav .nav-link.active-link {
  font-size: 1.3rem;
  color: #2E8B57 !important;
}

/* Estilo cuando el enlace es clickeado */
.navbar-nav .nav-link:active {
  transform: scale(1.3);
  color: #2E8B57 !important;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}

/* Centrar enlaces */
.navbar-collapse {
  flex-grow: 1;
  justify-content: center;
}

.estilo:hover{
  background: linear-gradient(to bottom, #ffdde1, #ffffff); 
}

</style>
