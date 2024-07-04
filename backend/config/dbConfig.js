const mongoose = require('mongoose');

// Usar la URL de conexión de MongoDB desde las variables de entorno
const mongoURI = process.env.mongo_url;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsInsecure: true  // Desactiva la validación de certificados SSL (solo para pruebas)
}).then(() => {
  console.log('Connected to database with SSL but without strict validation');
}).catch((err) => {
  console.error('Error connecting to database:', err);
});

const connection = mongoose.connection;

connection.on('error', (error) => {
    console.error('Error connecting to database:', error);
});

connection.once('open', () => {
    console.log('Mongo DB Connection Successful');
});

module.exports = connection;
