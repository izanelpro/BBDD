const bcrypt = require('bcryptjs');

bcrypt.hash('abc123', 10).then(console.log);


//COMPONENTE CREADO PARA CONSEGUIR EL HASH DE LA CONTRASEÑA PARA EL ADMIN CON NOMBRE NOMBRE. 