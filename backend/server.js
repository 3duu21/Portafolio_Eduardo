const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas API
const portfolioRoute = require('./routes/portfolioRoute');
app.use('/api/portfolio', portfolioRoute);

// Servir la aplicación React estática en producción
if (process.env.NODE_ENV === 'production') {
  // Servir archivos estáticos desde la carpeta build
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Configurar Express para manejar SPA: redirigir todas las demás rutas a index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.mongo_url, { dbName: "mern-portafolio-eduardo", useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a la base de datos MongoDB");
    app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
  })
  .catch((err) => console.error(err));
