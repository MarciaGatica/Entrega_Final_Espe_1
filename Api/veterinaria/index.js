import express from 'express';

import productoRouter from './src/routes/producto.router.js';
import usuarioRouter from './src/routes/usuario.router.js';
import authRouter from "./src/routes/auth.router.js";
import mascotaRouter from './src/routes/mascota.router.js';
import horaRouter from './src/routes/hora.router.js';

import { PORT } from './src/config/environment.js';
import connectDB from './src/config/mongo.js';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // Reemplaza con la URL de tu aplicación Vue
}));

app.use('/productos', productoRouter);
app.use('/usuarios', usuarioRouter);
app.use("/auth", authRouter);
app.use("/mascotas", mascotaRouter);
app.use("/hora", horaRouter);

async function startServer() {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
}

startServer();
