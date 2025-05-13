<template>
  <div class="container mt-4">
    <!-- FORMULARIO -->
    <div class="card p-3 mb-4 shadow">
      <h4 class="text-center mb-3"> Gestión de Acceso 🔐 </h4>
      <form @submit.prevent="modoEdicion ? actualizarAdmin() : crearAdmin()">
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center">
              <label for="nombre" class="form-label mb-0">Nombre:<span class="text-danger">*</span></label>
              <input type="text" class="form-control ms-2" id="nombre" v-model="admin.nombre" :disabled="modoEdicion" required>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center">
              <label for="contrasena" class="form-label mb-0">Contraseña:<span class="text-danger">*</span></label>
              <input type="password" class="form-control ms-2" id="contrasena" v-model="admin.contrasena" required>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="d-flex align-items-center">
              <label for="confirmaContrasena" class="form-label mb-0">Confirmar:<span class="text-danger">*</span></label>
              <input type="password" class="form-control ms-2" id="confirmaContrasena" v-model="admin.confirmaContrasena" required>
            </div>
          </div>
        </div>

        <span class="text-danger"> * </span> Campos obligatorios

        <div class="d-flex justify-content-center mt-2">
          <button type="submit" class="btn btn-sm" style="background-color: #5bc0de; color: white;">
            <i class="bi bi-person-plus-fill"></i> {{ modoEdicion ? 'Actualizar' : 'Crear' }}
          </button>
          <button v-if="modoEdicion" type="button" class="btn btn-sm btn-danger ms-3" @click="cancelarEdicion">
            <i class="bi bi-x-circle"></i> Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- TABLA -->
    <div class="card shadow-sm">
      <table class="table table-bordered table-responsive table-striped mb-0" style="box-shadow: 0px 4px 15px rgba(255, 105, 180, 0.3);">
        <thead class="table-light text-center">
          <tr>
            <th style="width: 100px;">ID</th>
            <th style="width: 300px;">Nombre</th>
            <th style="width: 300px;">Fecha Alta</th>
            <th style="width: 200px;">Acciones</th>
          </tr>
        </thead>
        <tbody class="table-hover">
          <tr v-for="a in listaAdmins" :key="a.id" class="table-row">
            <td class="py-1 text-center text-muted">{{ a.id }}</td>
            <td class="py-1 text-center">{{ a.nombre }}</td>
            <td class="py-1 text-center">{{ new Date(a.fechaAlta).toLocaleDateString() }}</td>
            <td class="py-1 text-center">
              <button class="btn btn-warning btn-sm me-1" style="background-color: #5bc0de; color: white;" @click="cargarParaEditar(a)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-outline-danger btn-sm" :disabled="a.nombre.toLowerCase() === 'admin'" :class="{ 'opacity-50': a.nombre.toLowerCase() === 'admin' }" @click="eliminarAdmin(a.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="listaAdmins.length === 0">
            <td colspan="3" class="text-center text-muted">No hay administradores registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINACIÓN -->
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
import Swal from 'sweetalert2';

export default {
  name: "GestionCuentas",
  data() {
    return {
      admin: {
        nombre: "",
        contrasena: "",
        confirmaContrasena: ""
      },
      listaAdmins: [],
      modoEdicion: false,
      idEditando: null,
      paginaActual: 1,
      adminsPorPagina: 6,
    };
  },
  mounted() {
    this.cargarAdmins();
  },

  computed: {
    totalPaginas() {
      return Math.ceil(this.listaAdmins.length / this.adminsPorPagina);
    },
    paginados() {
      const start = (this.paginaActual - 1) * this.adminsPorPagina;
      const end = start + this.adminsPorPagina;
      return this.listaAdmins.slice(start, end);
    }
  },
  methods: {

    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
      }
    },

    async cargarAdmins() {
      try {
        const res = await fetch("http://192.168.10.66:3000/api/admins");
        this.listaAdmins = await res.json();
        console.log(this.listaAdmins);
      } catch (err) {
        Swal.fire('Error', 'No se pudieron cargar los administradores.', 'error');
      }
    },

    async comprobarNombreRepetido(nombre){
      try{
        const res = await fetch(`http://192.168.10.66:3000/api/admins/${encodeURIComponent(nombre)}`)
        const data = await res.json();
        return data.existe;
      } catch(err) {
        console.log("Error al comprobar el nombre", err)
        return false;
      }
    },
    async crearAdmin() {
      if (this.admin.contrasena != this.admin.confirmaContrasena){
        Swal.fire('Error', 'Las contraseñas no coinciden','error')
        return;
      }

      const nombreExiste = await this.comprobarNombreRepetido(this.admin.nombre);
      if(nombreExiste) {
        Swal.fire("Error", "El nombre de usuario ya está en uso, vuelve a introducir los datos", "warning");
        this.admin= {
          nombre: "",
          contrasena: "",
          confirmaContrasena: ""
        }

        return; 
      }
      try {
        const res = await fetch("http://192.168.10.66:3000/api/admins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: this.admin.nombre,
            password: this.admin.contrasena
          })
        });

        if (!res.ok) throw new Error(await res.text());

        await Swal.fire({
          title: 'Creado',
          text: 'Administrador creado correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        this.admin = { nombre: "", contrasena: "" , confirmaContrasena: ""};
        this.cargarAdmins();
      } catch (err) {
        Swal.fire('Error', 'No se pudo crear el administrador: ' + err.message, 'error');
      }
    },
    cargarParaEditar(admin) {
      this.modoEdicion = true;
      this.idEditando = admin.id;
      this.admin.nombre = admin.nombre;
      this.admin.contrasena = "";
    },
    async actualizarAdmin() {
      if (this.admin.contrasena != this.admin.confirmaContrasena){
        Swal.fire('Error', 'Las contraseñas no coinciden','error')
        return;
      }
      try {
        const res = await fetch(`http://192.168.10.66:3000/api/admins/${this.idEditando}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: this.admin.contrasena })
        });

        if (!res.ok) throw new Error(await res.text());

        await Swal.fire({
          title: 'Actualizado',
          text: 'Contraseña actualizada correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        this.cancelarEdicion();
        this.cargarAdmins();
      } catch (err) {
        Swal.fire('Error', 'No se pudo actualizar: ' + err.message, 'error');
      }
    },

    cancelarEdicion() {
      this.modoEdicion = false;
      this.idEditando = null;
      this.admin = { nombre: "", contrasena: "" };
    },

    async eliminarAdmin(id) {
      const admin = this.listaAdmins.find(a => a.id === id);

      if (admin && admin.nombre.toLowerCase() === "admin") {
        await Swal.fire({
          icon: 'warning',
          title: 'Acción no permitida',
          text: 'El usuario "admin" no se puede eliminar por razones de seguridad.'
        });
        return;
      }

      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Esta acción eliminará al administrador de forma permanente!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmacion.isConfirmed) return;

      try {
        const res = await fetch(`http://192.168.10.66:3000/api/admins/${id}`, {
          method: "DELETE"
        });

        if (!res.ok) throw new Error(await res.text());

        await Swal.fire({
          title: 'Eliminado',
          text: 'Administrador eliminado correctamente.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        this.cargarAdmins();
      } catch (err) {
        Swal.fire('Error', 'No se pudo eliminar el administrador: ' + err.message, 'error');
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
</style>