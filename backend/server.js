const express = require('express');
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
    // Ruta para servir archivos estáticos
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Ruta para todas las demás solicitudes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
