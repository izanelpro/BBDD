<template>
  <br><br><br>
    <div class="acerca-de-container">
      <br>
      <div class="content-container">
        <h5 class="section-title">Gestión Estética</h5>
        <br>
        <p class="description-text">
          Aplicación perteneciente al departamento de Imagen Personal del IES de Teis.
        </p>
        <div class="details">
          <p class="display-6"><strong>Desarrollador:</strong> Juan Carlos Pérez González </p>
          <p><strong>Colaboradores:</strong> Ana Touza, Izán Rodríguez,  </p>
          <p><strong>Versión:</strong> 1.0.0</p>
          <p><strong>Año:</strong> 2025 </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AcercaDe'
  }
  </script>
  
  <style scoped>
  /* Fuente personalizada */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
  
  /* Contenedor principal */
  .acerca-de-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  /* Contenedor con el nombre de la marca */
  .brand-container {
    background: linear-gradient(to bottom, #ffdde1, #ffffff); /* Degradado de rosa a blanco */
    width: 100%;
    text-align: center;
    padding: 6px 0;
  }
  
  .brand-text {
    font-family: 'Playfair Display', serif;
    font-size: 0.6rem;
    font-weight: bold;
    color: #6a0572; /* Color original del texto */
  }
  
  /* Contenedor con el contenido */
  .content-container {
    background: linear-gradient(to right, #ffffff, #ffdde1, #ffffff); /* Degradado centrado */
    padding: 20px;
    width: 80%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    text-align: center;
  }
  
  /* Estilo del título */
  .section-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #6a0572; /* Mismo color que el de la marca */
    margin-bottom: 15px;
  }
  
  /* Estilo del texto descriptivo */
  .description-text {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 20px;
  }
  
  /* Estilo de los detalles (autor, versión) */
  .details p {
    font-size: 1.1rem;
    color: #6a0572;
    margin: 5px 0;
  }
  
  .details strong {
    font-weight: bold;
  }
  </style>
  