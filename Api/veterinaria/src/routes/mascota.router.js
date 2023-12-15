import express from 'express';
import {
    crearMascota ,listarMascotas,borrarMascota,editarMascota,  obtenerUnaMascota
} from '../controllers/mascota.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import isadmin from '../middlewares/isAdmin.middleware.js';


const mascotaRouter = express.Router();

mascotaRouter.get('/', listarMascotas);
mascotaRouter.get('/:mascotaId', obtenerUnaMascota);
mascotaRouter.post('/', crearMascota);
mascotaRouter.delete('/:mascotaId', borrarMascota);
mascotaRouter.put('/:mascotaId', editarMascota);

export default mascotaRouter;
