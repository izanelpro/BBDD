<template>
  <div class="container">
    <!-- Video de fondo -->
    <div class="video-background">
      <video ref="videoElement" autoplay loop muted>
        <source :src="videoSrc" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>

    <!-- Formulario de Login -->
    <div class="form-container">
      <div class="card p-4 mb-4 shadow">
        <h5 class="text-center mb-3">Acceso</h5>
        <form @submit.prevent="iniciarSesion" autocomplete="off">
          <!-- Campos del formulario -->
          <div class="mb-3">
            <label for="usuario" class="form-label">Usuario: </label>
            <input type="text" v-model="usuario" class="form-control" id="usuario" required autocomplete="off" />
          </div>
          <div class="mb-3">
            <label for="contrasena" class="form-label">Contraseña: </label>
            <input type="password" v-model="contrasena" class="form-control" id="contrasena" required autocomplete="off" />
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary btn-sm w-50 mt-3">Enviar</button>
          </div>
        </form>
        <div v-if="error" class="alert alert-danger mt-3 text-center" role="alert">
          {{ error }}
        </div>
        <!-- Mensaje para el registro de nuevos usuarios -->
        <p class="text-center text-danger mt-3 message-information" style="font-size: 0.9rem; color: #6c757d;">
          El registro de un nuevo usuario deberá solicitarse al administrador del sistema.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import videoSrc from '@/assets/video.mp4';  // Asegúrate de que esta ruta sea correcta

export default {
  name: "TablaHome",
  data() {
    return {
      usuario: "",
      contrasena: "",
      error: null,
      videoSrc: videoSrc,  // Aquí asignamos la ruta del video a `videoSrc`
    };
  },

  mounted() {
    window.localStorage.clear(); // Borra el almacenamiento local
    window.sessionStorage.clear(); // Borra la sesión de almacenamiento
    this.$nextTick(() => {
      this.usuario = "";
      this.contrasena = "";

      // Cambiar la velocidad de reproducción del video
      const video = this.$refs.videoElement; // Accede al video mediante su ref
      video.playbackRate = 0.4;  // 0.4 es la velocidad más baja. Cambia este valor según lo necesites.
    });
  },


  methods: {
    ...mapActions([
      "setAdminId",
      "setAdminNombre",
      "setAdminTipo"
    ]),
    async iniciarSesion() {
      this.error = null;
      try {
        const response = await axios.post("http://192.168.10.66:3000/api/login-admin", {
          nombre: this.usuario,
          pass: this.contrasena,
        });

        const { id, nombre, tipo } = response.data.usuario;

        this.setAdminId(id);
        this.setAdminNombre(nombre);
        this.setAdminTipo(tipo);


        this.$router.push("/tabla-usuarios");
      } catch (err) {
        console.error(err)
        if (err.response?.data?.message) {
          this.error = err.response.data.message;
        } else {
          this.error = "Error de conexión con el servidor2.";
        }
      }
    },
  },
};
</script>


<style scoped>
/* El contenedor de todo el componente */
.container {
  position: relative;
  display: flex;
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
  height: 75vh; /* Ocupa toda la altura de la pantalla */
  overflow: hidden; /* Evita que el contenido se desborde */
}

/* Estilo para el video de fondo */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Ahora ocupa un 80% de la altura de la pantalla */
  z-index: -1; /* Lo coloca por debajo de todo el contenido */
  overflow: hidden;
}

video {
  object-fit: cover; /* Asegura que el video cubra el contenedor */
  width: 100%; /* Ocupa el 100% del ancho de la pantalla */
  height: 100%; /* Ocupa el 100% de la altura del contenedor */
  filter: blur(3px); /* Difumina el video */
}

/* Estilo para el contenedor del formulario */
.form-container {
  z-index: 1; /* Asegura que el formulario esté por encima del video */
  width: 100%;
  max-width: 500px; /* Limita el ancho del formulario */
  padding: 20px;
  text-align: center;
  position: relative; /* Para asegurar que el formulario se quede por encima del video */
}

/* Estilo para el formulario */
.card {
  background: rgba(255, 255, 255, 0.8); /* Fondo semitransparente */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos adicionales */
h5 {
  font-family: 'Arial', sans-serif;
  color: #2c3e50;
  margin-bottom: 20px;
}

button {
  width: 100%;
}

button:hover {
  background-color: #3498db;
}

input[type="text"], input[type="password"] {
  border-radius: 5px;
}

.btn {
  background-color: #5bc0de;
  color: white;
}

.btn-sm {
  font-size: 0.875rem; /* Tamaño de fuente más pequeño */
  padding: 0.375rem 0.75rem; /* Reducir el padding */
}
</style>
