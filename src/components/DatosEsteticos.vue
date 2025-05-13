<template>
  <div class="container mt-4">
    <div class="card p-4 mb-4 shadow">
      <h5 class="text-center mb-3">Datos Estéticos 💆‍♀️</h5>
      <form @submit.prevent="guardarDatosEsteticos">
        <p v-if="usuarioId" class="text-center form-label bg-warning-subtle d-block p-2 rounded">
          ID Usuario: {{ usuarioId }} <span style="margin-left: 30px;"></span> Móvil: {{ usuarioMovil }}
        </p>
        <p v-else class="text-center form-label bg-warning-subtle d-block p-2 rounded"> Usuario No Seleccionado</p>
        <br>
        <br>
        <div class="row">
          <!-- Hidratantes Faciales -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="hidratantesFaciales" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Hidratación Facial 🧴:
              </label>
              <input type="text" v-model="datosEsteticos.hidratantesFaciales" class="form-control form-control-sm text-start" id="hidratantesFaciales" @blur="capitalizar('hidratantesFaciales')" style="max-width: 100%;"/>
            </div>
          </div>
          
          <!-- Hidratantes Corporales -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="hidratantesCorporales" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Hidratación Corporal 🛁:
              </label>
              <input type="text" v-model="datosEsteticos.hidratantesCorporales" class="form-control form-control-sm text-start" id="hidratantesCorporales" @blur="capitalizar('hidratantesCorporales')" style="max-width: 100%;"/>
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
          <!-- Aceites -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="aceites" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Aceites 🛢️:
              </label>
              <input type="text" v-model="datosEsteticos.aceites" class="form-control form-control-sm text-start" id="aceites" @blur="capitalizar('aceites')" style="max-width: 100%;"/>
            </div>
          </div>
          
          <!-- Protección Solar -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="proteccionSolar" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Protección Solar ☀️:
              </label>
              <input type="text" v-model="datosEsteticos.proteccionSolar" class="form-control form-control-sm text-start" id="proteccionSolar" @blur="capitalizar('proteccionSolar')" style="max-width: 100%;"/>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mb-3">
              <hr class="custom-divider" />
          </div>
        </div>

        <div class="row">
          <!-- Otra Cosmética -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="otraCosmetica" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Otra Cosmética 💅:
              </label>
              <input type="text" v-model="datosEsteticos.otraCosmetica" class="form-control form-control-sm text-start" id="otraCosmetica" @blur="capitalizar('otraCosmetica')" style="max-width: 100%;"/>
            </div>
          </div>
          
          <!-- Métodos de Depilación -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="metodosDepilacion" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Dudas Estética 📏:
              </label>
              <input type="text" v-model="datosEsteticos.preocupacionesEsteticas" class="form-control form-control-sm text-start" id="preocupacionesEsteticas" @blur="capitalizar('preocupacionesEsteticas')" style="max-width: 100%;"/>
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
          <!-- Otra Cosmética -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="otraCosmetica" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                 Cuidados Cosmética 🪞:
              </label>
              <input type="text" v-model="datosEsteticos.tratamientosRealizados" class="form-control form-control-sm text-start" id="tratamientosRealizados" @blur="capitalizar('tratamientosRealizados')" style="max-width: 100%;"/>
            </div>
          </div>
          
          <!-- Métodos de Depilación -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="metodosDepilacion" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  Cirugía Estética 🔪:
              </label>
              <input type="text" v-model="datosEsteticos.cirugiaEstetica" class="form-control form-control-sm text-start" id="cirugiaEstetica" @blur="capitalizar('cirugiaEstetica')" style="max-width: 100%;"/>
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
          <!-- Otra Cosmética -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="otraCosmetica" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                 Alergias Cosméticas 🤧 :
              </label>
              <input type="text" v-model="datosEsteticos.alergiaCosmetica" class="form-control form-control-sm text-start" id="otraCosmetica" @blur="capitalizar('alergiaCosmetica')" style="max-width: 100%;"/>
            </div>
          </div>
          
          <!-- Métodos de Depilación -->
          <div class="col-md-6 mb-3">
            <div class="d-flex align-items-center">
              <label for="metodosDepilacion" class="form-label me-2" style="min-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                Tipos Depilación ✂️:
              </label>
              <input type="text" v-model="datosEsteticos.metodosDepilacion" class="form-control form-control-sm text-start" id="metodosDepilacion" style="max-width: 100%;"/>
            </div>
          </div>
        </div> 
        <br />
        <!-- Caja de texto para observaciones -->
        <div class="mb-3">
          <label for="observaciones" class="form-label text-center">
            Observaciones 📝
          </label>
          <textarea v-model="datosEsteticos.observaciones" id="observaciones" class="form-control" rows="3"></textarea>
        </div> 
        <div class="d-flex justify-content-center">
          <!-- Solo muestra el botón "Modificar Datos" si hay un usuario seleccionado -->
          <button type="submit" class="btn btn-primary w-10 mt-3" :disabled="!usuarioId">
              Introducir Datos
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
      datosEsteticos: {
        id: '',
        hidratantesFaciales: '',
        hidratantesCorporales: '',
        aceites: '',
        proteccionSolar: '',
        otraCosmetica: '',
        alergiaCosmetica: '',
        tratamientosRealizados: '',
        cirugiaEstetica: '',
        preocupacionesEsteticas: '',
        metodosDepilacion: '',
        observaciones: ''
      }
    };
  },
  computed: {
    usuarioId() {
      console.log('usuarioId desde Vuex:', this.$store.getters.getUsuarioId);
      return this.$store.getters.getUsuarioId;
    },
    usuarioMovil() {
      return this.$store.getters.getUsuarioMovil;
    }
},
  created() {
  if (this.usuarioId) {
    this.cargarDatosEsteticos(this.usuarioId);
  }
  }
,
watch: {
  // Cuando el usuarioId cambie, carga los datos estéticos asociados
  usuarioId(newId) {
    if (newId) {
      this.cargarDatosEsteticos(newId);  // Cargamos los datos estéticos
    } else {
      this.datosEsteticos = {  // Limpiar los datos estéticos si no hay usuario seleccionado
        id: '',
        hidratantesFaciales: '',
        hidratantesCorporales: '',
        aceites: '',
        proteccionSolar: '',
        otraCosmetica: '',
        alergiaCosmetica: '',
        tratamientosRealizados: '',
        cirugiaEstetica: '',
        preocupacionesEsteticas: '',
        metodosDepilacion: '',
      };
    }
  }
},

  methods: {
   // Método para capitalizar solo la primera letra de la primera palabra
    capitalizar(campo) {
      // Capitaliza solo la primera letra de la primera palabra en el campo especificado
      this.datosEsteticos[campo] = this.datosEsteticos[campo].charAt(0).toUpperCase() + this.datosEsteticos[campo].slice(1).toLowerCase();
    },


    async cargarDatosEsteticos(id) {
    try {
      const response = await axios.get(`http://192.168.10.66:3000/api/datos-esteticos/${id}`);
      // Llenar los datos estéticos con la respuesta
      this.datosEsteticos = response.data;
    } catch (error) {
      console.error('Error al obtener los datos estéticos:', error);
      
    }
    },


    async guardarDatosEsteticos() {
      if (!this.usuarioId) {
        console.error('No se puede guardar sin un usuario seleccionado.');
        Swal.fire('Error', 'Selecciona un usuario antes de guardar los datos.', 'error');
        return;
      }


      this.datosEsteticos.id = this.usuarioId || this.datosEsteticos.id;

      try {
        const response = await axios.post('http://192.168.10.66:3000/api/datos-esteticos', {
          ...this.datosEsteticos,
          id: this.usuarioId
        });
        
        console.log('Datos guardados correctamente:', response.data);
        Swal.fire('Éxito', 'Datos guardados con éxito', 'success');        
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al guardar los datos.', 'error');
          if (error.response) {
            // Si el error tiene una respuesta (lo que indica un error HTTP)
            console.error('Detalles del error:', error.response.data);
            alert('Error al guardar los datos: ' + error.response.data.message || 'Error desconocido');
          } else {
            // Si no hay respuesta, es un error de red o algún otro error
            alert('Hubo un error al realizar la solicitud.');
          }
        }
  }
}
};
</script>

<style scoped>
/* Estilos personalizados para ajustar el tamaño de los inputs */
.custom-divider {
  border: 0;
  height: 2px; /* Aumenté el grosor */
  background-color: #f06292; /* Color rosado */
  margin: 10px 0;
  width: 100%; /* La línea ocupará el 100% del contenedor */
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
  width: 50%; /* Ahora ocupa solo la mitad del contenedor */
  font-size: 0.9rem; /* Tamaño de fuente más pequeño */
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
  color: #343a40; /* Color oscuro para el texto, resalta bien sobre el fondo amarillo */
  font-weight: bold; /* Acentúa el texto para mayor visibilidad */
  padding: 8px;
  border-radius: 5px; /* Bordes redondeados para un acabado más suave */
}

.btn {
  background-color: #5bc0de;
  color: white;
}
</style>
