require("dotenv").config();
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const Vuelo = require("./models/vueloModel");
const Usuario = require("./models/userModel");
const Reserva = require("./models/reservaModel");

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_CONNECTION_PRUEBA_ADMIN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("¡Conexión de DB exitosa!");
    } catch (err) {
        console.error("¡Conexión de DB fallida!", err);
        process.exit(1);
    }
};

const vuelosData = [
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-01",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-01",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-01",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Quito",
        fecha: "2024-12-01",
        horario: "11:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Quito",
        fecha: "2024-12-01",
        horario: "03:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Quito",
        fecha: "2024-12-01",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Cuenca",
        fecha: "2024-12-02",
        horario: "02:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Cuenca",
        fecha: "2024-12-02",
        horario: "04:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Cuenca",
        fecha: "2024-12-02",
        horario: "08:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Cuenca",
        fecha: "2024-12-03",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Cuenca",
        fecha: "2024-12-03",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Cuenca",
        fecha: "2024-12-03",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Manta",
        fecha: "2024-12-04",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Manta",
        fecha: "2024-12-04",
        horario: "12:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Manta",
        fecha: "2024-12-04",
        horario: "04:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Manta",
        destino: "Quito",
        fecha: "2024-12-05",
        horario: "11:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Manta",
        destino: "Quito",
        fecha: "2024-12-05",
        horario: "03:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Manta",
        destino: "Quito",
        fecha: "2024-12-05",
        horario: "07:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Esmeraldas",
        fecha: "2024-12-06",
        horario: "08:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Esmeraldas",
        fecha: "2024-12-06",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Esmeraldas",
        fecha: "2024-12-06",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Cuenca",
        destino: "Loja",
        fecha: "2024-12-07",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Cuenca",
        destino: "Loja",
        fecha: "2024-12-07",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Cuenca",
        destino: "Loja",
        fecha: "2024-12-07",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Tena",
        fecha: "2024-12-08",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Tena",
        fecha: "2024-12-08",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Tena",
        fecha: "2024-12-08",
        horario: "03:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Coca",
        fecha: "2024-12-09",
        horario: "11:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Coca",
        fecha: "2024-12-09",
        horario: "04:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Coca",
        fecha: "2024-12-09",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Macas",
        fecha: "2024-12-10",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Macas",
        fecha: "2024-12-10",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Macas",
        fecha: "2024-12-10",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Cumbaya",
        fecha: "2024-12-11",
        horario: "08:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Cumbaya",
        fecha: "2024-12-11",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Cumbaya",
        fecha: "2024-12-11",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Santo Domingo",
        fecha: "2024-12-12",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Santo Domingo",
        fecha: "2024-12-12",
        horario: "03:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Santo Domingo",
        fecha: "2024-12-12",
        horario: "07:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Latacunga",
        fecha: "2024-12-13",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Latacunga",
        fecha: "2024-12-13",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Latacunga",
        fecha: "2024-12-13",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Ambato",
        fecha: "2024-12-14",
        horario: "11:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Ambato",
        fecha: "2024-12-14",
        horario: "03:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Ambato",
        fecha: "2024-12-14",
        horario: "07:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Cañar",
        fecha: "2024-12-15",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Cañar",
        fecha: "2024-12-15",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Cañar",
        fecha: "2024-12-15",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Tena",
        fecha: "2024-12-16",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Tena",
        fecha: "2024-12-16",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Tena",
        fecha: "2024-12-16",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Machala",
        fecha: "2024-12-17",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Machala",
        fecha: "2024-12-17",
        horario: "12:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Machala",
        fecha: "2024-12-17",
        horario: "04:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Coca",
        fecha: "2024-12-18",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Coca",
        fecha: "2024-12-18",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Coca",
        fecha: "2024-12-18",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Otavalo",
        fecha: "2024-12-19",
        horario: "08:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Otavalo",
        fecha: "2024-12-19",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Otavalo",
        fecha: "2024-12-19",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-20",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-20",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-20",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Quito",
        fecha: "2024-12-21",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Quito",
        fecha: "2024-12-21",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Quito",
        fecha: "2024-12-21",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Cuenca",
        fecha: "2024-12-22",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Cuenca",
        fecha: "2024-12-22",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Cuenca",
        fecha: "2024-12-22",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Loja",
        fecha: "2024-12-23",
        horario: "08:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Loja",
        fecha: "2024-12-23",
        horario: "12:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Loja",
        fecha: "2024-12-23",
        horario: "04:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Ambato",
        fecha: "2024-12-24",
        horario: "11:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Ambato",
        fecha: "2024-12-24",
        horario: "03:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Ambato",
        fecha: "2024-12-24",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Manta",
        fecha: "2024-12-25",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Manta",
        fecha: "2024-12-25",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Manta",
        fecha: "2024-12-25",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-26",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-26",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Guayaquil",
        fecha: "2024-12-26",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Cuenca",
        fecha: "2024-12-27",
        horario: "09:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Cuenca",
        fecha: "2024-12-27",
        horario: "02:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Cuenca",
        fecha: "2024-12-27",
        horario: "05:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Loja",
        fecha: "2024-12-28",
        horario: "10:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Loja",
        fecha: "2024-12-28",
        horario: "01:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Loja",
        fecha: "2024-12-28",
        horario: "06:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Guayaquil",
        destino: "Ambato",
        fecha: "2024-12-29",
        horario: "08:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Ambato",
        fecha: "2024-12-29",
        horario: "12:00 PM",
        disponibilidad: true,
    },
    {
        origen: "Guayaquil",
        destino: "Ambato",
        fecha: "2024-12-29",
        horario: "04:00 PM",
        disponibilidad: false,
    },
    {
        origen: "Quito",
        destino: "Cumbaya",
        fecha: "2024-12-30",
        horario: "11:00 AM",
        disponibilidad: true,
    },
    {
        origen: "Quito",
        destino: "Cumbaya",
        fecha: "2024-12-30",
        horario: "03:00 PM",
        disponibilidad: true,
    }
];

const seedDB = async () => {
    await mongoConnect();
    
    const adminId = '64c5f2a92b3e4f2d8d8f3a4e';
    const adminPass = 'admin';
    const passwordEncrypt = bcrypt.hashSync(adminPass, 12);
    const adminUser = new Usuario({
        _id: adminId,
        username: 'admin',
        password: passwordEncrypt,
        correo: 'admin',
        nombre: 'admin'
    });
    const vueloId = '67252275402d1dba28e3c06e';
    const vueloBase = new Vuelo({
        _id: vueloId,
        origen: 'New York',
        destino: 'Guayaquil',
        fecha: "2024-12-01",
        horario: "06:00 PM",
        disponibilidad: true
    });
    const reservaId = '672526d3f1f99aa33f9c2001';
    const reservaBase = new Reserva({
        _id: reservaId,
        usuarioId: adminId,
        vueloId: '67252275402d1dba28e3c067',
    });
    await Vuelo.deleteMany({});
    await Usuario.deleteMany({});
    await Reserva.deleteMany({});
    await adminUser.save();
    await vueloBase.save();
    await reservaBase.save();
    await Vuelo.insertMany(vuelosData);
    
    console.log("¡Base de datos poblada con vuelos!");
    mongoose.connection.close(); 
};

seedDB().catch(console.error);
