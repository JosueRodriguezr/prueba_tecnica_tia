const mongoose = require('mongoose');
const URI = process.env.MONGOOSE_CONNECTION_PRUEBA_ADMIN;

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const mongoConnect = async () => {
    try {
        await mongoose.connect(URI, config);
        console.log("Conexión a MongoDB exitosa");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        process.exit(1); 
    }
    
};
exports.mongoConnect = mongoConnect;