const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
// const dbConfig = require('./config/dbConfig');
// import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5000;

// Rutas
const portfolioRoute = require('./routes/portfolioRoute');
const { default: mongoose } = require('mongoose');

// Middleware
app.use(express.json());
app.use('/api/portfolio', portfolioRoute);

// Configuración de producción
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

//Use the client app
app.use(express.static(path.join(__dirname, '/client/build')))

 
// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`)
// })


//Connecting to mongo db using mongoose
mongoose
    .connect(process.env.mongo_url, {dbName : "mern-portafolio-eduardo"})
    .then(() => {
        console.log("Connected to DB successfully")

        //Listening to request if db connection is successful
        app.listen({port}, () => console.log(`Listening to port ${port}`))
    })
    .catch((err) => console.log(err))
