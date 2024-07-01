const express = require('express');
const path = require('path');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para redirigir HTTP a HTTPS
// app.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//         return res.redirect(`https://${req.headers.host}${req.url}`);
//     }
//     next();
// });

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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
