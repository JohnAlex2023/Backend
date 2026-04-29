const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas públicas
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Rutas protegidas
const userRoutes = require('./routes/users.routes');
app.use('/api/users', userRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejo de errores
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
app.use(notFound);
app.use(errorHandler);

module.exports = app;