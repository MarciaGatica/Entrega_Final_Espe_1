import mongoose from 'mongoose';

const horaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: Number,
        required: true,
        min: 1,
        max: 9,
    },

    nombre_mascota: {
        type: String,
        required: true,
    },
    especie: {
        type: String,
        required: true,
    },
    encargado: {
        type: String,
        required: true,
    },
    id_usuario: {
        type: String,
        required: true,
    },
    motivo:{
        type: String,
        default: 'No se especifica',
        required: true,
    }
}, {
    timestamps: true
});

const horaModel = mongoose.model('Hora', horaSchema); 

export default horaModel;