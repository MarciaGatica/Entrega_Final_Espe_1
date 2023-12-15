import express from 'express';
import {
    crearProducto, listarProductos , borrarProducto, editarProducto, obtenerUnProducto
} from '../controllers/producto.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';
import isadmin from '../middlewares/isAdmin.middleware.js';


const productoRouter = express.Router();

productoRouter.get('/', listarProductos);
productoRouter.get('/:productoId', obtenerUnProducto);
productoRouter.post('/', authMiddleware, isadmin, crearProducto);
productoRouter.delete('/:productoId',authMiddleware, isadmin, borrarProducto);
productoRouter.put('/:productoId',authMiddleware, isadmin, editarProducto);

export default productoRouter;
