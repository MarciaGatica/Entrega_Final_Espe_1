import express from 'express';
import {
    crearHora, listarHoras, borrarHora, editarHora, obtenerUnaHora
} from '../controllers/hora.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import isadmin from '../middlewares/isAdmin.middleware.js';


const horaRouter = express.Router();

horaRouter.get('/',listarHoras);
horaRouter.get('/:horaId', obtenerUnaHora);
horaRouter.post('/',authMiddleware, crearHora);
horaRouter.delete('/:horaId', borrarHora);
horaRouter.put('/:horaId', editarHora);

export default horaRouter;
