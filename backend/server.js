const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const app = express();
const port = process.env.PORT || 5000;

// Rutas
const portfolioRoute = require('./routes/portfolioRoute');

// Middleware
app.use(express.json());
app.use('/api/portfolio', portfolioRoute);

// Configuración de producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

// Certificados SSL
const sslOptions = {
    key: fs.readFileSync('/path/to/privkey.pem'),
    cert: fs.readFileSync('/path/to/fullchain.pem')
};

// Crear servidor HTTPS
https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
