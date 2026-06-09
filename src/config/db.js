const mongoose = require('mongoose');
 
/**
 * Conexión a la base de datos PROPIA de este microservicio (shared-nothing).
 * No comparte la base con el servicio de usuarios ni con otros módulos.
 */
const conectarDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('La variable MONGO_URI no está definida en el archivo .env');
    }
 
    // Mongoose 8: ya no se pasan useNewUrlParser / useUnifiedTopology
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB conectado -> host: ${conn.connection.host} | BD: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};
 
module.exports = conectarDB;
 