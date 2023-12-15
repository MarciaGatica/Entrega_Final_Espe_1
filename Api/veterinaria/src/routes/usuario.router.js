import express from 'express';
import {
    obtenerUnUsuario,
    listarUsuarios,
    crearUsuario,
    borrarUsuario,
    editarUsuario
} from '../controllers/usuario.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import isadmin from '../middlewares/isAdmin.middleware.js';


const usuarioRouter = express.Router();

usuarioRouter.get('/', listarUsuarios);
usuarioRouter.get('/:usuarioId', obtenerUnUsuario);
usuarioRouter.post('/',authMiddleware, isadmin, crearUsuario);
usuarioRouter.delete('/:usuarioId', borrarUsuario);
usuarioRouter.put('/:usuarioId', editarUsuario);

export default usuarioRouter;
