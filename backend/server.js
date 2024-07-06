const express = require('express');
const cors = require('cors'); // Importar cors
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
// const dbConfig = require('./config/dbConfig');
// import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://portafolio-eduardo.onrender.com' // Permitir solicitudes desde tu frontend
}));
app.use(express.json());

// Rutas
const portfolioRoute = require('./routes/portfolioRoute');
const { default: mongoose } = require('mongoose');

app.use('/api/portfolio', portfolioRoute);

// Configuración de producción
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

// Use the client app
app.use(express.static(path.join(__dirname, '/client/build')))

// Connecting to mongo db using mongoose
mongoose
    .connect(process.env.mongo_url, {dbName : "mern-portafolio-eduardo"})
    .then(() => {
        console.log("Connected to DB successfully")

        // Listening to request if db connection is successful
        app.listen({port}, () => console.log(`Listening to port ${port}`))
    })
    .catch((err) => console.log(err))
