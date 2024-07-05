const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: 'https://6687923d61200ef2e1114ff1--nimble-kitten-cff20c.netlify.app/', // Reemplaza con el dominio de tu aplicación React
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rutas
const portfolioRoute = require('./routes/portfolioRoute');
app.use('/https://portafolio-eduardo-66pp.onrender.com/api/portfolio', portfolioRoute);

// Configuración de producción
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Use the client app
app.use(express.static(path.join(__dirname, '/client/build')));

// Conectar a la base de datos
mongoose.connect(process.env.mongo_url, { dbName: 'mern-portafolio-eduardo' })
  .then(() => {
    console.log('Connected to DB successfully');

    // Listening to requests if db connection is successful
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(err));
