<template>
    <div class="container mt-4">
  <!-- Formulario para agregar o modificar datos clínicos -->
    <div class="card p-4 mb-4 shadow">
    <h4 class="text-center mb-3"> Contraindicaciones ⚠️ </h4>
    <form @submit.prevent="manejarFormulario">
      <p v-if="usuarioId" class="text-center form-label bg-warning-subtle d-block p-2 rounded">
        ID Usuario: {{ usuarioId }}   <span style="margin-left: 30px;"> </span>    Móvil: {{usuarioMovil }}
      </p>
      <p v-else class="text-center form-label bg-warning-subtle d-block p-2 rounded"> Usuario No Seleccionado</p>
        <br>
      <div class="row">
      <!--Cera Caliente -->
      <div class="col-md-12 mb-3">
        <div class="d-flex align-items-center">
          <label for="ceraCaliente" class="form-label me-2" style="min-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Cera Tibia 🌡️:
          </label>
          <div class="d-flex flex-wrap">
            <div class="form-check me-4" v-for="(contraindicacion) in ceraTibia" :key="contraindicacion.id">
              <input class="form-check-input" type="checkbox" :id="contraindicacion.id" :value="contraindicacion.value" v-model="contraIndicaciones.ceraTibia" />
              <label class="form-check-label" :for="contraindicacion.id">
                {{ contraindicacion.value }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- Línea separadora -->
        <div class="row">
        <div class="col-12 mb-3">
            <hr class="custom-divider" />
        </div>
        </div>
      </div>
      <div class="row">
      <!--Cera Caliente -->
      <div class="col-md-12 mb-3">
        <div class="d-flex align-items-center">
          <label for="ceraCaliente" class="form-label me-2 mb-3" style="min-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Cera Caliente 🌡️:
          </label>
          <div class="d-flex flex-wrap">
            <div class="form-check me-4" v-for="(contraindicacion) in ceraCaliente" :key="contraindicacion.id">
              <input class="form-check-input" type="checkbox" :id="contraindicacion.id" :value="contraindicacion.value" v-model="contraIndicaciones.ceraCaliente" />
              <label class="form-check-label" :for="contraindicacion.id">
                {{ contraindicacion.value }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- Línea separadora -->
        <div class="row">
        <div class="col-12 mb-3">
            <hr class="custom-divider" />
        </div>
        </div>
      </div>
      <div class="row">
        <div class="row">
      <!-- Depilación Eléctrica -->
      <div class="col-md-12 mb-3">
        <div class="d-flex align-items-center">
          <label for="depilacionElectrica" class="form-label me-2" style="min-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Depilación Eléctrica ⚡ :
          </label>
          <div class="d-flex flex-wrap">
            <div class="form-check me-4 mb-3" v-for="(contraindicacion) in depilacionesElectrica" :key="contraindicacion.id">
              <input class="form-check-input" type="checkbox" :id="contraindicacion.id" :value="contraindicacion.value" v-model="contraIndicaciones.depilacionesElectrica" />
              <label class="form-check-label" :for="contraindicacion.id">
                {{ contraindicacion.value }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- Línea separadora -->
        <div class="row">
        <div class="col-12 mb-3">
            <hr class="custom-divider" />
        </div>
        </div>
         <!-- Fotodepilación -->
      <div class="col-md-12 mb-3">
        <div class="d-flex align-items-center">
          <label for="depilacionElectrica" class="form-label me-2" style="min-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Fotodepilación 🌅 :
          </label>
          <div class="d-flex flex-wrap">
            <div class="form-check me-4 mb-3" v-for="(contraindicacion) in fotoDepilacion" :key="contraindicacion.id">
              <input class="form-check-input" type="checkbox" :id="contraindicacion.id" :value="contraindicacion.value" v-model="contraIndicaciones.fotoDepilacion" />
              <label class="form-check-label" :for="contraindicacion.id">
                {{ contraindicacion.value }}
              </label>
            </div>
          </div>
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
      <!-- Observaciones -->
      <div class="col-md-12 mb-3">
     <label for="observaciones" class="form-label">Observaciones 📝 : </label>
     <textarea v-model="contraIndicaciones.observaciones" id="observaciones" class="form-control" rows="3"></textarea>
      </div>  
    </div> 
        
        <!-- Botones para guardar o modificar los datos piel -->
        <div class="d-flex justify-content-center">
            <div class="d-flex justify-content-center">
              <!-- Solo muestra el botón "Modificar Datos" si hay un usuario seleccionado -->
              <button type="submit" class="btn btn-primary w-10 mt-3" :disabled="!usuarioId">
                Modificar Datos
              </button>
            </div>
          </div>
    </form>
  </div>
</div>
</template>

<script>
export default{
    data (){
        return {
            contraIndicaciones: {
              ceraCaliente:[],
              ceraTibia: [],
              depilacionesElectrica: [],
              fotoDepilacion: [],
              observaciones: null       
            }, 

        ceraCaliente: [
        { id: "acne", value: "Acné" },
        { id: "dermantosis", value: "Dermatosis" },
        { id: "circulacion", value: "Problemas Circulación" },
        { id: "varicosidades", value: "Varicosidades" },
        { id: "telangiectasias", value: "Telangiectasias" }
      ],
        ceraTibia: [
            { id: "acne", value: "Acné" },
            { id: "dermantosis", value: "Dermatosis" },
            { id: "circulacion", value: "Trastornos Circulación" },
            { id: "grandesvarices", value: "Grandes Varices" },
            { id: "flacidez", value: "Flacidez" }
      ],
        depilacionesElectrica: [
            { id: "acne", value: "Acné" },
            { id: "heridas", value: "Heridas" },
            { id: "inflamacion", value:"Inflamaciones"},
            { id: "irritacion", value: "Irritaciones"},
            { id: "foliculos", value: "Folículos Inflamados" },
            { id: "eczemas", value: "Ezcemas" },
            { id: "embarazo", value: "Embarazo" },
            { id: "diu", value: "DIU" },
            { id: "marcapasos", value: "Marcapasos" },
            { id: "coronas", value: "Coronas dentarias" },
            { id: "hilos", value: "Hilos de oro" },
            { id: "epilepsia", value: "Epilepsia" },
        ],
        fotoDepilacion: [
            { id: "cisretinoico", value: "Tratamiento Ácido CisRetinoico" },
            { id: "neoplasias", value: "Neoplasias" },
            { id: "fotosensibilidad", value:"Fotosensibilidad"},
            { id: "fiebre", value: "Fiebre"},
            { id: "infeccion", value: "Infecciones Agudas" },
            { id: "cutaneas", value: "Infecciones Cutáneas" },
            { id: "inmunodeficiencia", value: "Inmunodeficiencias víricas" },
            { id: "herpes", value: "Herpes" },
            { id: "cicatrizacion", value: "Problemas cicatrización" },
            { id: "varices", value: "Varices" },
            { id: "flebitis", value: "Flebitis" },
            { id: "arteriopatias", value: "Arteriopatías" },
            { id: "tumores", value: "Tumores" },
            { id: "epilepsia", value: "Epilepsia" },
            { id: "inmunodeprimido", value: "Inmunodeprimido" },
            { id: "lesionpiel", value: "Lesiones Piel" },
            { id: "pigmentos", value: "Lesiones Pigmentarias" },
            { id: "nevus", value: "Nevus" },
            { id: "tatuajes", value: "Tatuajes" },
            { id: "micropigmento", value: "Micropigmentación" },
        ]
      }
    },
  
  computed:{
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
    // this.cargarHabitosVida(this.usuarioId); // Llamar a una función que cargue los hábitos de vida
  },

manejarFormulario() {
      if (this.usuarioId) {
        console.log('Modificando datos:', this.datosPiel);
      } else {
        console.log('Guardando nuevos datos:', this.datosPiel);
      }
    }
}
</script>
<style scoped>
/* Estilos para el formulario de datos clínicos */
.container {
  max-width: 1400px;
}
.custom-divider {
  border: 0;
  height: 2px; /* Aumenté el grosor */
  background-color: #f06292; /* Color rosado */
  margin: 10px 0;
  width: 100%; /* La línea ocupará el 100% del contenedor */
}
.card {
  padding: 20px;
}
.text-center.form-label.bg-warning-subtle {
  background: radial-gradient(circle, #fff3b0 0%, #ffffff 100%);
  color: #343a40; /* Color oscuro para el texto, resalta bien sobre el fondo amarillo */
  font-weight: bold; /* Acentúa el texto para mayor visibilidad */
  padding: 8px;
  border-radius: 5px; /* Bordes redondeados para un acabado más suave */
}
.form-label {
  font-weight: 600;
}

textarea {
  resize: none;
}

.btn {
  background-color: #5bc0de;
  color: white;
}
</style>

