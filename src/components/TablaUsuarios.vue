<template>
  <div class="container mt-4">
      <!-- Formulario para agregar o modificar usuarios -->
    <div class="card p-3 mb-4 shadow">
      <h4 class="text-center mb-3"> Usuarios  👤  </h4>
      <form @submit.prevent="guardarUsuario">
        <!-- Fila 1: Nombre, Apellidos y Edad -->
        <div class="row">
          <div class="col-md-2 mb-3">
            <label for="id" class="ms-3 text-center fw-bold text-danger form-label bg-warning-subtle d-block p-2 rounded" 
              style="max-width: 140px; min-height: 36px; line-height: 1.1;">   {{ usuario.id ? usuario.id : ' ' }} </label>
          </div>
          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center">
              <span class="text-danger">*</span><label for="nombre" class="form-label fw-bold mb-0">Nombre:</label>
              <input v-model="usuario.nombre" 
                     type="text" 
                     class="form-control ms-2" 
                     id="nombre" 
                     required 
                     @blur="formatearNombre">
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="d-flex align-items-center">
              <span class="text-danger ms-1">*</span><label for="apellidos" class="form-label fw-bold mb-0">Apellidos:</label>
              <input v-model="usuario.apellidos" 
                     type="text" 
                     class="form-control ms-2" 
                     id="apellidos" 
                     required 
                     @blur="formatearApellidos">
            </div>
          </div>
          <div class="col-md-2 mb-3">
            <div class="d-flex align-items-center">
              <span class="text-danger">*</span><label for="edad" class="form-label fw-bold mb-0">Edad:</label>
              <input v-model="usuario.edad" 
                     type="number" 
                     class="form-control ms-2 text-center" 
                     id="edad" 
                     style="max-width: 100px;"
                     required>
            </div>
          </div>
        </div>

        <!-- Fila 2: Dirección y Profesión -->
        <div class="row">
          <div class="col-md-9 mb-3">
            <div class="d-flex align-items-center">
              <label for="direccion" class="form-label fw-bold mb-0">Dirección:</label>
              <input v-model="usuario.direccion" 
                     type="text" 
                     class="form-control ms-2" 
                     id="direccion"
                     @blur="formatearDireccion"
                     placeholder="opcional">
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="d-flex align-items-center">
              <label for="profesion" class="form-label fw-bold mb-0">Profesión:</label>
              <input v-model="usuario.profesion" 
                     type="text" 
                     class="form-control ms-2" 
                     id="profesion"
                     placeholder="opcional"
                     @blur="formatearProfesion">
            </div>
          </div>
        </div>

        <!-- Fila 3: Móvil y Email -->
        <div class="row">
          <div class="col-md-3 mb-3">
            <div class="d-flex align-items-center">
              <span class="text-danger">*</span><label for="movil" class="form-label mb-0 fw-bold me-2">Móvil:</label>
              <div class="input-group">
                <input v-model="usuario.movil" 
                      type="text" 
                      class="form-control ms-2 me-2 text-center" 
                      id="movil"
                      @blur="validarMovil"
                      required  
                      placeholder="Introduzca móvil">
                      <!-- Campo obligatorio -->
                      <button 
                        class="btn btn-outline-secondary" 
                        type="button" 
                        @click="buscarUsuarioPorMovil" 
                        style="background-color: #5bc0de; color: white;" >
                        <i class="bi bi-search"></i>  <!-- Icono de lupa -->
                      </button>
                </div>
              <small v-if="movilError" class="text-danger"></small> <!-- Mensaje de error -->
            </div>
          </div>
          <div class="col-md-9 mb-3">
            <div class="d-flex align-items-center">
              <label for="email" class="form-label fw-bold mb-0">Email:</label>
              <input v-model="usuario.email" 
                    type="email" 
                    class="form-control ms-2" 
                    id="email"
                    placeholder="opcional"
                    @blur="validarEmail">
          <!-- Botón con el icono de flecha circular -->
              <button 
                type="button" 
                class="btn btn-secondary ms-2" 
                @click="limpiarFormulario"
                style="background-color: #5bc0de; color: white;" >
                <i class="bi bi-arrow-clockwise"></i> <!-- Icono de flecha circular -->
              </button>
            </div>
          </div>
        </div>
        
        <span class="text-danger"> *</span><span class="fst-italic"> Campos obligatorios </span> 
        <!-- Botones de acción centrados -->
        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-sm" style="background-color: #5bc0de; color: white;"> Guardar </button>
          <button type="button" class="btn btn-sm btn-danger ms-3" @click="eliminarUsuario">Eliminar</button>
        </div>
      </form>
    </div>
  </div>
  <div class="container mt-4">
    <!-- Tabla de usuarios -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    <table v-else class="table table-bordered table-responsive table-striped" style="box-shadow: 0px 4px 15px rgba(255, 105, 180, 0.3);">
      <thead class="table-light">
        <tr class="text-center">
          <th>ID</th>
          <th>Apellidos</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Móvil</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody class="table-hover">
        <tr v-for="usuario in paginados" :key="usuario.id" class="table-row">
          <td class="py-1 text-center">{{ usuario.id }}</td>
          <td class="py-1">{{ usuario.apellidos }}</td>
          <td class="py-1">{{ usuario.nombre }}</td>
          <td class="py-1 text-center">{{ usuario.edad }}</td>
          <td class="py-1 text-center">{{ usuario.movil }}</td>
          <td class="py-1 justify-content-center">
            <div class="d-flex justify-content-center">     
              <button class="btn btn-warning btn-sm me-1" style="background-color: #5bc0de; color: white;" @click="editarUsuario(usuario)">
                <i class="bi bi-pencil-square"></i>  
              </button> 
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Paginación -->
    <div class="d-flex justify-content-center mt-2">
      <button class="btn btn-sm" :disabled="paginaActual === 1" @click="cambiarPagina(paginaActual - 1)" style="background-color: #f8c6d2; border-color: #f8c6d2;">
        <i class="bi bi-chevron-left"></i>
      </button>
      <span class="mx-2" style="font-size: 0.75rem; color: #555; display: flex; align-items: center;">{{ paginaActual }} / {{ totalPaginas }}</span>
      <button class="btn btn-sm" :disabled="paginaActual === totalPaginas" @click="cambiarPagina(paginaActual + 1)" style="background-color: #f8c6d2; border-color: #f8c6d2;">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
 
  name: 'TablaUsuarios',
  data() {
    return {
      usuarios: [],
      usuario: {
        id: null,
        apellidos: '',
        nombre: '',
        direccion: '',
        profesion: '',
        edad: null,
        movil: '',
        email: ''
      },
      
      movilError: false,
      loading: true,
      paginaActual: 1,  // Página inicial
      usuariosPorPagina: 6,  // Cantidad de usuarios por página
    };
  },

  computed: {
    totalPaginas() {
      return Math.ceil(this.usuarios.length / this.usuariosPorPagina);
    },
    paginados() {
      const start = (this.paginaActual - 1) * this.usuariosPorPagina;
      const end = start + this.usuariosPorPagina;
      return this.usuarios.slice(start, end);
    },
    usuarioId() {
      return this.$store.getters.getUsuarioId; // Accede al usuarioId desde Vuex
    },
    usuarioMovil() {
      return this.$store.getters.getUsuarioMovil; // Obtiene el usuarioMovil
    }
  },

  mounted() {
    this.cargarUsuarios();
  },

  created() {
    if (this.usuarioId) {
      //this.loadHabitosVida();
    }
  },

  methods: {
    async cargarUsuarios() {
      try {
        const response = await axios.get('http://192.168.10.66:3000/api/usuarios');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        this.loading = false;
      }
    },

    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
      }
    },
   
  // Capitaliza cada palabra de un string
    capitalizar(texto) {
        return texto.replace(/\b\w/g, char => char.toUpperCase());
      },
    validarMovil() {
      const movilRegex = /^[67]\d{8}$/;
      if (this.usuario.movil && !movilRegex.test(this.usuario.movil)) {
        this.movilError = true;
        Swal.fire({
          icon: 'error',
          title: 'Número de móvil inválido',
          text: 'El móvil debe empezar por 6 o 7 y contener 9 dígitos.'
        });
      } else {
        this.movilError = false;
      }
    },
    formatearNombre() {
    if (this.usuario.nombre) {
      this.usuario.nombre = this.capitalizar(this.usuario.nombre);
       }
     },
    formatearApellidos() {
    if (this.usuario.apellidos) {
      this.usuario.apellidos = this.capitalizar(this.usuario.apellidos);
      }
    },
    formatearDireccion() {
    if (this.usuario.direccion) {
      this.usuario.direccion = this.capitalizar(this.usuario.direccion);
      }
    },
    formatearProfesion() {
    if (this.usuario.profesion) {
      this.usuario.profesion = this.capitalizar(this.usuario.profesion);
     }
    },
  
    selectUser(id) {
      // Usamos Vuex para actualizar el usuarioId global
      this.$store.dispatch('setUsuarioId', id);  // Esto dispara la acción para actualizar el estado
    },

    ...mapActions(['limpiarUsuario']),

    limpiarFormulario() {
      this.limpiarUsuario();
        // Limpiar el modelo de datos
        this.usuario.id = "ID";
        this.usuario.email = '';  // Limpiar el campo de email
        this.usuario.nombre = '';
        this.usuario.movil = '';
        this.usuario.edad = null;
        this.usuario.direccion = '';
        this.usuario.profesion = '';
        this.usuario.apellidos = '';
      },

    async buscarUsuarioPorMovil() {
      if (this.usuario.movil) {
        try {
          // Hacemos la consulta al backend para buscar el usuario por móvil
          const response = await axios.get(`http://192.168.10.66:3000/api/usuarios/${this.usuario.movil}`);
          
          if (response.data) {
            // Si el usuario existe, cargamos los datos en el formulario
            this.usuario = response.data;
            this.$store.dispatch('setUsuarioId', this.usuario.id); 
            this.$store.dispatch('setUsuarioMovil', this.usuario.movil ) // Llamada a la acción de Vuex
          } else {
            // Si no se encuentra el usuario, mostramos un mensaje
            Swal.fire({
              icon: 'info',
              title: 'Usuario no encontrado',
              text: 'No se ha encontrado un usuario con ese número de móvil.'
            }).then(() => {
              // Limpiar el formulario después de que el mensaje se cierre
              this.limpiarFormulario();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario No Existe o Móvil No Válido'
          }).then(() => {
            // Limpiar el formulario después de que el mensaje se cierre
            this.limpiarFormulario();
          });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Móvil requerido',
          text: 'Por favor, ingrese un número de móvil para buscar el usuario.'
        }).then(() => {
          // Limpiar el formulario después de que el mensaje se cierre
          this.limpiarFormulario();
        });
      }
    },

    editarUsuario(usuario) {
      // Cargar los datos del usuario en el formulario
      this.usuario = { ...usuario };
      console.log('Usuario seleccionado:', this.usuario)
        // Actualizar el usuarioId en el Vuex store
        this.$store.dispatch('setUsuarioId', usuario.id); 
        this.$store.dispatch('setUsuarioMovil', usuario.movil ) // Llamada a la acción de Vuex
          // Verificar si el id es "ID" y reemplazarlo
          if (this.usuario.id === "ID") {
            this.usuario.id = null;
      }
      },

    // Validación centralizada
    async guardarUsuario() {
      // Capitalizar los campos relevantes
      this.formatearNombre();
      this.formatearApellidos();
      this.formatearDireccion();
      this.formatearProfesion();

      // Validar email y móvil de una vez
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const movilRegex = /^[67]\d{8}$/;

    // Validación del email
    if (this.usuario.email && !emailRegex.test(this.usuario.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor, ingrese un correo electrónico válido.'
      });
      return;
    }

    // Validación del móvil
    if (this.usuario.movil && !movilRegex.test(this.usuario.movil)) {
      Swal.fire({
        icon: 'error',
        title: 'Número de móvil inválido',
        text: 'El móvil debe empezar por 6 o 7 y contener 9 dígitos.'
      });
      return;
    }

    try {
      // Verificar si el móvil ya existe
      const { data: usuarios } = await axios.get('http://192.168.10.66:3000/api/usuarios');
      const movilExistente = usuarios.find(user => user.movil === this.usuario.movil && user.id !== this.usuario.id);

      if (movilExistente) {
        Swal.fire({
          icon: 'error',
          title: 'Móvil duplicado',
          text: 'Número de móvil ya está registrado. Por favor, use otro.'
        });
        return;
      }

      let usuarioGuardado;

      // Si el usuario tiene id (actualización), utilizamos ese id, de lo contrario, no lo enviamos
      let usuarioAEnviar = { ...this.usuario };
      if (!usuarioAEnviar.id) {
        // Si no tiene id (creación), eliminamos el campo id
        delete usuarioAEnviar.id;
      }

      if (this.usuario.id) {
        // Si el usuario tiene id (actualización)
        const { data } = await axios.put(`http://192.168.10.66:3000/api/usuarios/${this.usuario.id}`, usuarioAEnviar);
        usuarioGuardado = data;
      } else {
        // Si no tiene id (creación), enviamos el usuario sin el id
        const { data } = await axios.post('http://192.168.10.66:3000/api/usuarios', usuarioAEnviar);
        usuarioGuardado = data;
      }

      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Datos de usuario actualizados correctamente.'
      });

      // Actualizar el objeto usuario con los datos obtenidos
      this.usuario = { ...usuarioGuardado };
      // Recargar la lista de usuarios (si es necesario)
      this.cargarUsuarios();

    } catch (error) {
      console.error('Error al guardar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al guardar el usuario.'
      });
    }
  },


  async eliminarUsuario(id) {
        if (!id) return;
        const result = await Swal.fire({
          icon: 'warning',
          title: '¿Estás seguro?',
          text: '¿Deseas eliminar este usuario?',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        });
        if (!result.isConfirmed) return;
        try {
          await axios.delete(`http://192.168.10.66:3000/api/usuarios/${id}`);
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El usuario ha sido eliminado.'
          });
          this.cargarUsuarios();
        } catch (error) {
          console.error('Error al eliminar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el usuario.'
          });
        }
      }
    }
  };
</script>

<style scoped>
  /* Estilo de la tabla */
  .table-bordered {
    border: 1px solid #f0c0c0;
  }
  .table-light th {
    font-size: 0.9rem;
    background: linear-gradient(to bottom, #f8e0e0, #f0c0c0);
  }
  .table-row {
    background: linear-gradient(to bottom, #ffffff, #fbe4e4);
    transition: background-color 0.3s ease-in-out;
  }
  .table-row:hover {
    background-color: #f1c1c1;
  }
  .table th, .table td {
    padding: 12px;
  }
  .table td {
    font-size: 0.9rem;
  }
  .custom-thead th {
  background: radial-gradient(circle, #f1eeef, #ffdde1); /* Degradado centrado de rosa claro a tono más fuerte */
  color: #343a40; /* Color del texto */
  font-weight: bold; /* Negrita */
  text-align: center; /* Centrado */
}
  /* Botones */
  .btn-sm {
    padding: 6px 12px;
  }
  .btn-warning {
    background-color: #f9c6c6;
    border-color: #f7b5b5;
  }
  .btn-danger {
    background-color: #f8a7a7;
    border-color: #f56b6b;
  }
  .btn-warning:hover {
    background-color: #f7b5b5;
  }
  .btn-danger:hover {
    background-color: #f56b6b;
  }
  /* Spinner */
  .spinner-border {
    width: 2rem;
    height: 2rem;
    border-width: 0.2rem;
  }
  .table {
  margin-bottom: 20px;
  }
  .btn {
    margin-top: 5px;
  }
  /* Para Chrome, Safari, Edge y Opera */
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
  }

  /* Para Firefox */
  input[type=number] {
      -moz-appearance: textfield;
  }

</style>
