<template>
  <div class="container mt-4">
    <!-- Formulario para agregar o modificar hábitos de vida -->
    <div class="card p-4 mb-4 shadow">
      <h5 class="text-center mb-3">Hábitos de Vida 💖 </h5>
      <form @submit.prevent="guardarHabitosVida">
        <p v-if="usuarioId" class="text-center form-label bg-warning-subtle d-block p-2 rounded">
          ID Usuario: {{ usuarioId }} <span style="margin-left: 30px;"> </span> Móvil: {{ usuarioMovil }}
        </p>
        <p v-else class="text-center form-label bg-warning-subtle d-block p-2 rounded"> Usuario No Seleccionado</p>
        <br>

        <div class="row">
          <!-- Comidas -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="comidas" class="form-label me-2" style="width: 150px;">
                Comidas 🍽️ :
              </label>
              <input type="text" v-model="habitosVida.comidas" class="form-control small-input text-start"
                id="comidas" @blur="capitalizar('comidas')" />
            </div>
          </div>

          <!-- Horas de dormir -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="horasDormir" class="form-label me-2" style="width: 150px;">
                Horas Sueño 🛏️ :
              </label>
              <input type="text" v-model="habitosVida.horasDormir" class="form-control small-input text-start"
                id="horasDormir" @blur="capitalizar('horasDormir')" />
            </div>
          </div>
        </div>

        <!-- Línea separadora -->
        <div class="row">
          <div class="col-12 mb-3">
            <hr class="custom-divider" />
          </div>
        </div>

        <!-- Ejercicio -->
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="ejercicio" class="form-label me-2" style="width: 150px;">
                Ejercicio 🏃‍♂️ :
              </label>
              <input type="text" v-model="habitosVida.ejercicio" class="form-control small-input text-start"
                id="ejercicio" @blur = "capitalizar('ejercicio')" />
            </div>
          </div>
        </div>

        <!-- Línea separadora -->
        <div class="row">
          <div class="col-12 mb-3">
            <hr class="custom-divider" />
          </div>
        </div>

        <div class="row">
          <!-- Alcohol -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="alcohol" class="form-label me-2" style="width: 150px;">
                Alcohol 🍻 :
              </label>
              <input type="text" v-model="habitosVida.alcohol" class="form-control small-input text-start"
                id="alcohol" @blur = "capitalizar('alcohol')"/>
            </div>
          </div>

          <!-- Tabaco -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="tabaco" class="form-label me-2" style="width: 150px;">
                Tabaco 🚬 :
              </label>
              <input type="text" v-model="habitosVida.tabaco" class="form-control small-input text-start" id="tabaco" 
              @blur = "capitalizar('tabaco')"/>
            </div>
          </div>
        </div>

        <!-- Línea separadora -->
        <div class="row">
          <div class="col-12 mb-3">
            <hr class="custom-divider" />
          </div>
        </div>

        <div class="row">
          <!-- Hidratación -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="hidratacion" class="form-label me-2" style="width: 150px;">
                Hidratación 💧 :
              </label>
              <input type="text" v-model="habitosVida.hidratacion" class="form-control small-input text-start"
                id="hidratacion" @blur="capitalizar('hidratacion')" />
            </div>
          </div>

          <!-- Horas de sol -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="horasSol" class="form-label me-2" style="width: 150px;">
                Horas Sol 🌞 :
              </label>
              <input type="text" v-model="habitosVida.horasSol" class="form-control small-input text-start"
                id="horasSol" @blur="capitalizar('horasSol')"/>
            </div>
          </div>
        </div>

        <!-- Línea separadora -->
        <div class="row">
          <div class="col-12 mb-3">
            <hr class="custom-divider" />
          </div>
        </div>

        <br />
        <!-- Caja de texto para observaciones -->
        <div class="mb-3">
          <label for="observaciones" class="form-label text-center">
            Observaciones 📝
          </label>
          <textarea v-model="habitosVida.observaciones" id="observaciones" class="form-control" rows="3"></textarea>
        </div>

        <!-- Botón para guardar o modificar hábitos de vida -->
        <div class="d-flex justify-content-center">
          <!-- Solo muestra el botón "Modificar Datos" si hay un usuario seleccionado -->
          <button type="submit" class="btn btn-primary w-10 mt-3" :disabled="!usuarioId" @click="guardarHabitosVida">
            Modificar Datos
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
     
      habitosVida: {
        id: '',
        comidas: '',
        horasDormir: '',
        ejercicio: '',
        alcohol: '',
        tabaco: '',
        hidratacion: '',
        horasSol: '',
        observaciones: ''
      }
    };
  },
  computed: {
    // Accede al usuarioId y usuarioMovil desde Vuex
    usuarioId() {
      return this.$store.getters.getUsuarioId; // Obtiene el usuarioId desde Vuex
    },
    usuarioMovil() {
      return this.$store.getters.getUsuarioMovil; // Obtiene el usuarioMovil desde Vuex
    }
  },
  created() {
    // Usar el usuarioId para hacer alguna acción inicial si es necesario
    console.log('ID del usuario en HabitosVida.vue:', this.usuarioId);
    console.log('Móvil del usuario en HabitosVida.vue:', this.usuarioMovil);

    // Si es necesario, puedes hacer una llamada API para cargar los hábitos de vida del usuario
    // Ejemplo:
    // this.cargarHabitosVida(this.usuarioId); 
    this.cargarHabitosVida(this.usuarioId);
  },

  methods: {
   // Método para capitalizar el texto de un campo específico
   capitalizar(campo) {
      // Capitaliza la primera letra de cada palabra en el campo especificado
      this.habitosVida[campo] = this.habitosVida[campo].replace(/\b\w/g, char => char.toUpperCase());
    },

    limpiarFormulario() {
        // Limpiar el modelo de datos
        this.habitosVida.id = "ID";
        this.habitosVida.comidas = '',
        this.habitosVida.horasdormir= '',
        this.habitosVida.ejercicio= '',
        this.habitosVida.alcohol= '',
        this.habitosVida.tabaco= '',
        this.habitosVida.hidratacion= '',
        this.habitosVida.horassol= '',
        this.habitosVida.observaciones= ''
      },
    async cargarHabitosVida(usuarioId) {
      try {
        if (!usuarioId) {
          console.warn('Usuario ID no proporcionado para cargar hábitos de vida.');
          return;
        }
        const response = await axios.get(`http://192.168.10.66:3000/api/habitosVida/${usuarioId}`);
        if (response.data) {
          this.habitosVida = response.data;  // Si ya existen hábitos, los cargamos
        }
      } catch (error) {
        console.error('Error al cargar los hábitos de vida:', error);
      }
    },

    async guardarHabitosVida() {
      try {
        
        let response;
        // Si existen hábitos de vida, hacemos un PUT, si no, un POST
        if (this.habitosVida.id) {
          console.log('Modificando hábitos existentes:', this.habitosVida);
          Swal.fire({
              icon: 'success',
              title: 'Hábitos Actualizados',
              text: 'Hábitos de Vida actualizados.'
            })
          response = await axios.put(`http://192.168.10.66:3000/api/habitosVida/${this.usuarioId}`, this.habitosVida);

        } else {
          console.log('Creando nuevos hábitos:', this.habitosVida);
          Swal.fire({
              icon: 'success',
              title: 'Hábitos Creados',
              text: 'Hábitos de Vida creados con éxito.'
            }).then(() => {
              // Limpiar el formulario después de que el mensaje se cierre
              this.limpiarFormulario();
            });
          response = await axios.post(`http://192.168.10.66:3000/api/habitosVida/${this.usuarioId}`, this.habitosVida);
        }
        this.habitosVida = response.data;
      } catch (error) {
        console.error('Error al guardar los hábitos de vida:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados para ajustar el tamaño de los inputs */
.custom-divider {
  border: 0;
  height: 2px;
  /* Aumenté el grosor */
  background-color: #f06292;
  /* Color rosado */
  margin: 10px 0;
  width: 100%;
  /* La línea ocupará el 100% del contenedor */
}

.d-flex {
  display: flex;
  align-items: center;
}

.me-2 {
  margin-right: 10px;
}

/* Reducir el tamaño de los inputs a la mitad del ancho de su contenedor */
.small-input {
  width: 50%;
  /* Ahora ocupa solo la mitad del contenedor */
  font-size: 0.9rem;
  /* Tamaño de fuente más pequeño */
}

/* Asegura que el texto esté alineado a la izquierda */
.text-start {
  text-align: left;
}

.form-label {
  font-weight: 600;
}

.text-center.form-label.bg-warning-subtle {
  background: radial-gradient(circle, #fff3b0 0%, #ffffff 100%);
  color: #343a40;
  /* Color oscuro para el texto, resalta bien sobre el fondo amarillo */
  font-weight: bold;
  /* Acentúa el texto para mayor visibilidad */
  padding: 8px;
  border-radius: 5px;
  /* Bordes redondeados para un acabado más suave */
}

.btn {
  background-color: #5bc0de;
  color: white;
}
</style>
