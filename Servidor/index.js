const express = require("express");
const conectarDB = require('./config/db');
const cors = require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const verificarToken = require('./middleware/auth');

// Creamos el servidor 
const app = express();

// Conectamos a la base de datos
conectarDB();

// Configurar CORS correctamente para aceptar cookies
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/loginUser', require('./routes/usuarioLogin'));
app.use('/api/misProductos', require('./routes/misProductos'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/carrito', require('./routes/carrito'));
app.use('/api/categorias',require('./routes/categoriaRoutes'));
app.use('/api/registroUser', require('./routes/usuarioRegistro'));
//api para cerrar la secion
app.use('/api/logout',require('./routes/usuariologout'));


//usuarios
app.use('/api', require('./routes/usuarioRoutes'));

app.get('/api/usuarioSesion', verificarToken, require('./routes/usuarioRoutes'));





// Iniciar servidor
app.listen(4000, () => {
  console.log('El servidor arrancó perfectamente en el puerto 4000');
});
