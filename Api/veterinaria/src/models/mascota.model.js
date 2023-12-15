import mongoose from 'mongoose';


const mascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    dieta: {
        type: String,
        required: true
    },
    encargado: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    } // Almacenar la imagen en formato Base64
});

const mascotaModel = mongoose.model('Mascota', mascotaSchema);

export default mascotaModel;