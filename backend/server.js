const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
// const dbConfig = require('./config/dbConfig');
// import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5000;

// Configurar CORS
const corsOptions = {
    origin: 'https://6687923d61200ef2e1114ff1--nimble-kitten-cff20c.netlify.app/', // Reemplaza con el dominio de tu aplicación React
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rutas
const portfolioRoute = require('./routes/portfolioRoute');
const { default: mongoose } = require('mongoose');

// Middleware
app.use(express.json());
app.use('https://portafolio-eduardo-66pp.onrender.com/api/portfolio', portfolioRoute);

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
    .connect(process.env.mongo_url, { dbName: "mern-portafolio-eduardo" })
    .then(() => {
        console.log("Connected to DB successfully")

        //Listening to request if db connection is successful
        app.listen({ port }, () => console.log(`Listening to port ${port}`))
    })
    .catch((err) => console.log(err))
