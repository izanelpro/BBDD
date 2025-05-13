<template>
  <footer class="footer-container">
    <div class="footer-brand-container">
      <router-link to="/acerca" class="footer-about-link">
          <strong>Acerca</strong>
      </router-link>
      <span class="brand-text fs-6">✨ Departamento de Imagen Personal - IES de Teis ✨ </span> 
      <span class="footer-bottom">
        {{ new Date().getFullYear() }} Todos los derechos reservados. 
        <!-- Sección Acerca de en la misma línea -->
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
/* Fuente personalizada */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

/* Contenedor del footer */
.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, #ffdde1, #ffffff);
  padding: 10px 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Sección superior del footer */
.footer-brand-container {
  padding: 6px 0;
}

.brand-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: bold;
  color: #6a0572;
}

/* Sección inferior del footer */
.footer-bottom {
  font-size: 0.9rem;
  color: #6a0572;
  margin-top: 5px;
  display: inline-block; /* Para que los elementos estén en la misma línea */
}

/* Sección Acerca de */
.footer-about-link {
  text-decoration: none;
  color: #6a0572;
  margin-left: 10px; /* Espacio entre el texto y el enlace */
}

.footer-about-link:hover {
  text-decoration: underline;
}
</style>
