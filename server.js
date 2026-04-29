require('dotenv').config(); // ← SIEMPRE la primera línea

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
     await connectDB();  // Primero la base de datos
    app.listen(PORT, () => {
      console.log(` Servidor en http://localhost:${PORT}`);
      console.log(` Entorno: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor: ', error);
    console.exit(1);
  }
};


startServer();