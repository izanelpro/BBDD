//*** CONEXIÓN BASE DE DATOS ***/

import 'core-js/stable/index.js'; // Si estás usando ES Modules
import mysql from 'mysql2';  // Usar import en lugar de require
import bcrypt from "bcryptjs";


// Configuración de la base de datos
const dbConfig = {
  host: '192.168.10.66', // Conexión inicial a 192.168.10.66
  user: 'admin',
  password: 'abc123',
  database: 'bbdd2',
  multipleStatements: true,
};

// Variable global para la conexión de la base de datos
let db;

// Función para intentar la conexión y verificar que realmente responde
const connectToDb = async (host) => {
  console.log(`Intentando conectar a ${host}...`);
  try {
    const dbConnection = await mysql.createConnection({
      ...dbConfig,
      host,
    });

    // Verificación real con una consulta simple
    await dbConnection.promise().query('SELECT 1');

    console.log(`Conexión exitosa a ${host}`);
    return dbConnection;
  } catch (err) {
    console.error(`Error al conectar a ${host}: ${err.message}`);
    throw err;
  }
};

// Intentamos conectar primero a 192.168.10.66, luego a 192.168.10.66 si falla
(async () => {
  try {
    db = await connectToDb('192.168.10.66');
  } catch {
    console.log('Conexión a 192.168.10.66 fallida. Intentando conectar a 192.168.10.66...');
    try {
      db = await connectToDb('192.168.10.66');
    } catch {
      console.error('Conexión fallida a ambos hosts.');
      process.exit(1); // Salimos del proceso si no se puede conectar a ninguna base de datos
    }
  }
})();


// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  const { nombre, pass } = req.body;
  console.log("este es el usuario", req.body);

  const query = 'SELECT * FROM administradores WHERE nombre = ?';
  console.log('Realizando consulta para obtener admin con nombre:', nombre);


  try {
    // Usamos el promise wrapper para manejar la consulta SQL asincrónica
    const [results] = await db.promise().query(query, [nombre]);

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Administrador no encontrado' });
    }

    const admin = results[0];

    // Comparar la contraseña
    const esValida = await bcrypt.compare(pass, admin.contrasena);
    
    if (!esValida) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    // Respuesta exitosa
    res.json({
      success: true,
      usuario: {
        id: admin.id,
        nombre: admin.nombre,
        tipo: admin.tipo,
      }
    });
  } catch (err) {
    console.error('❌ Error al procesar la solicitud:', err);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      errorDetails: err,
    });
  }
};

// CREAR CUENTA ADMINISTRADOR 

const guardarAdministrador = (req, res) => {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  const tipo = 'admin';

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('❌ Error al hashear contraseña:', err);
      return res.status(500).send('Error interno');
    }

    const query = 'INSERT INTO administradores (nombre, tipo, contrasena) VALUES (?, ?, ?)';
    db.query(query, [nombre, tipo, hash], (err, result) => {
      if (err) {
        console.error('❌ Error al insertar admin:', err);
        return res.status(500).send('Error al guardar el administrador');
      }

      res.status(201).json({
        success: true,
        message: 'Administrador creado',
        admin: {
          id: result.insertId,
          nombre,
          tipo
        }
      });
    });
  });
};

// OBTENER TODAS LAS CUENTAS 
const obtenerAdministradores = (req, res) => {
  const query = 'SELECT id, nombre, tipo, fechaAlta FROM administradores'; 

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener administradores:', err);
      return res.status(500).send('Error al obtener administradores');
    }

    res.json(results);
  });
};


// ELIMINAR ADMINISTRADOR

const eliminarAdministrador = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM administradores WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar administrador:', err);
      return res.status(500).send('Error al eliminar administrador');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Administrador no encontrado');
    }
    res.sendStatus(200);
  });
};


// ACTUALIZAR CONTRASEÑA CUENTA

const actualizarContrasenaAdmin = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error al hashear contraseña:', err);
      return res.status(500).send('Error interno');
    }

    const query = 'UPDATE administradores SET contrasena = ? WHERE id = ?';
    db.query(query, [hash, id], (err) => {
      if (err) {
        console.error('Error al actualizar contraseña:', err);
        return res.status(500).send('Error al actualizar contraseña');
      }

      res.sendStatus(200);
    });
  });
};

// COMPROBAR NOMBRE 

const comprobarNombreAdmin = (req, res , next) => {
    const {nombre} = req.params;

    if(!isNaN(nombre)){
      return next();
    }

    const query = 'SELECT COUNT(*) AS existe FROM administradores WHERE LOWER(nombre) = LOWER(?)'; 

    db.query(query, [nombre], (err, results) => {
      if(err) {
        console.log("Error al comprobar el nombre: ", err);
        return res.status(500).send("Error en el servidor");
      }

      const existe = results[0].existe > 0;
      res.json({existe})
    })

}


export {
  loginAdmin,
  guardarAdministrador,
  obtenerAdministradores,
  eliminarAdministrador,
  actualizarContrasenaAdmin,
  comprobarNombreAdmin
};


//HE CREADO ESTE COMPONENTE QUE SE ENCARGA DE GESTIONAR LA LÓGICA DEL LOGIN DE USUARIOS, COMPRUEBA LOS DATOS OBTENIDOS CON LOS QUE HAY EN LA BASE DE DATOS. 