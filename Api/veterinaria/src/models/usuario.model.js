import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre_usuario: {
        type: String,
        required: true,
    },
    clave: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    foto_usuario: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true
});

const usuarioModel = mongoose.model('Usuario', usuarioSchema);

export default usuarioModel;