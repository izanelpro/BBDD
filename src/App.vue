<template>
  <div id="app">
    <NavBar />  
    <div class="content">
      <router-view />  <!-- Aquí se cargan las vistas con scroll -->
    </div>
    <NavFooter />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import NavFooter from './components/NavFooter.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    NavFooter
  }
};
</script>

<style>
/* Ocupa toda la pantalla */
html, body, #app {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

/* Navbar fijo arriba */
NavBar {
  height: 60px; /* Ajusta el tamaño */
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  ;
}

/* Footer fijo abajo */
NavFooter {
  height: 50px;
  background-color: #333;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}

/* Contenedor del contenido con scroll */
.content {
  flex: 1;
  margin-top: 60px; /* Ajusta según la altura del navbar */
  margin-bottom: 50px; /* Ajusta según la altura del footer */
  overflow: auto; /* Scroll solo aquí */
  padding: 20px;
}
</style>
