import express from 'express';
import cors from 'cors';  // Importamos cors
import helmet from 'helmet';  // Para medidas de seguridad
import morgan from 'morgan';  // Para logging
import { obtenerUsuarios, guardarUsuario, eliminarUsuario, buscarUsuarioPorMovil, actualizarUsuario, 
  guardarDatosClinicos, obtenerDatosClinicos, guardarTratamiento, guardarZonaTratamiento,
  actualizarTratamiento, obtenerZonasPorTratamiento, obtenerTratamientosPorUsuario, getTratamiento,
  obtenerHabitosVida, editarHabitosVida, guardarHabitosVida, obtenerDatosEsteticos, guardarDatosEsteticos,
  guardarDatosPiel, obtenerDatosPiel,editarDatosPiel
} from './servicios.js';  // Asegúrate de usar la extensión .js si es un módulo ES
import { loginAdmin, guardarAdministrador, obtenerAdministradores, eliminarAdministrador, actualizarContrasenaAdmin, comprobarNombreAdmin } from './admin.js'; //LOGIN Y GESTIÓN DE ADMINS

const app = express();
const port = process.env.PORT || 3000;  // Usar variable de entorno para el puerto

// Seguridad adicional
app.use(helmet());  // Añadir protección con helmet

// Permitir solicitudes de todos los orígenes (desarrollo)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Logging de peticiones (opcional, pero recomendado)
app.use(morgan('combined'));  // Usamos el formato de logs 'combined'

// Middleware para parsear JSON en el cuerpo de la solicitud
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas relacionadas con servicios
app.get('/', (req, res) => {
  res.send('¡Servidor corriendo!');
});

app.get('/api', (req, res) => {
  res.send('¡Servidor corriendo en api!');
});
// Manejo de errores global (sin usar next)
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log de la pila del error
  res.status(500).send('Algo salió mal');  // Respuesta genérica de error
});

// Iniciar el servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en 0.0.0.0:3000');
});


// ***  FUNCIONES USUARIOS ***//

// Endpoint para obtener usuarios
app.get('/api/usuarios', obtenerUsuarios);

// Endpoint para guardar un usuario
app.post('/api/usuarios', guardarUsuario);

// Endpoint para actualizar un usuario
app.put('/api/usuarios/:id', actualizarUsuario);

// Endpoint para buscar un usuario por móvil
app.get('/api/usuarios/:movil', buscarUsuarioPorMovil);

// Endpoint para eliminar usuario
app.delete('/api/usuarios/:id', eliminarUsuario);

//*** HABITOS DE VIDA  ***/

// Endpoint para obtener los hábitos de vida
app.get('/api/habitosVida/:id', obtenerHabitosVida);

// Endpoint para guardar los hábitos de vida
app.post('/api/habitosVida/:id', guardarHabitosVida);

// Endpoint para editar los hábitos de vida
app.put('/api/habitosVida/:id', editarHabitosVida);

//*** DATOS ESTÉSTICOS ***/

// Endpoit para obtener datos estéticos
app.get('/api/datos-esteticos/:id', obtenerDatosEsteticos);

// Endpoint para guardar o actualizar datos estéticos

app.post('/api/datos-esteticos', guardarDatosEsteticos);

//*** DATOS CLÍNICOS ***/

//Endpoint para guardar o actualizar datos clínicos
app.post('/api/datosclinicos', guardarDatosClinicos);

//Enpoint para conseguir los datos
app.get('/api/datosclinicos/:id', obtenerDatosClinicos);


//*** FUNCIONES TRATAMIENTOS  ***/

// Endpoint para obtener tratamientos de un usuario específico
app.get('/api/tratamientos/:usuarioId', obtenerTratamientosPorUsuario);

// Endpoint para guardar un nuevo tratamiento
app.post('/api/tratamientos', guardarTratamiento);

// Endpoint para actualizar un tratamiento existente
app.put('/api/tratamientos/:id', actualizarTratamiento);

// Endpoint para actualizar un tratamiento existente
app.get('/api/tratamientos/usuario/:id', getTratamiento);

// Endpoint para eliminar un tratamiento
//app.delete('/api/tratamientos/:id', eliminarTratamiento);

// Endpoint para obtener las zonas de un tratamiento específico
app.get('/api/zona-tratamiento/:tratamientoId', obtenerZonasPorTratamiento);

// Endpoint para guardar una zona asociada a un tratamiento
app.post('/api/zona-tratamiento', guardarZonaTratamiento);

//** DATOS PIEL**/
app.get('/api/datosPiel/:id', obtenerDatosPiel);
app.post('/api/datosPiel/:id', guardarDatosPiel);
app.put('/api/datosPiel/:id', editarDatosPiel);


//** ENDPOINT LOGIN**/
app.post('/api/login-admin', (req, res, next) => {
  console.log('Solicitud de login recibida');  // Log para depuración
  next();  // Llama a la siguiente función, que es loginAdmin
}, loginAdmin);
//** ENDPOINT GUARDAR CUENTA**/
app.post('/api/admins', guardarAdministrador);
//** ENDPOINT CONSEGUIR TODAS LAS CUENTAS**/
app.get('/api/admins', obtenerAdministradores);
//** ENDPOINT ELIMINAR CUENTA**/
app.delete('/api/admins/:id', eliminarAdministrador);
//** ENDPOINT ACTUALIZAR CONTRASEÑA**/
app.put('/api/admins/:id', actualizarContrasenaAdmin);
//** ENDPOINT COMPROBAR NOMBRE ADMIN**/
app.get('/api/admins/:nombre', comprobarNombreAdmin);


