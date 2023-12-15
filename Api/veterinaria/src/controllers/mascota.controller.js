import mascotaModel from '../models/mascota.model.js';


async function crearMascota(request, response) {
    try {
        const body = request.body;
        const camposRequeridos = ['nombre', 'especie', 'edad', 'dieta','encargado','email','telefono', 'foto'];

        for (const campo of camposRequeridos) {
            if (!body[campo]) {
                return response.status(400).send({
                    error: `El campo '${campo}' es obligatorio. Por favor, proporcione todos los campos requeridos.`,
                });
            }
        }
        const mascota = await mascotaModel.create({
            nombre: body.nombre,
            especie: body.especie,
            edad: body.edad,
            dieta: body.dieta,
            encargado: body.encargado,
            email: body.email,
            telefono: body.telefono,
            foto: body.foto,
            
        });

        return response.status(201).send({
            mascota,
            message: 'mascota creado exitosamente.',
        });
    } catch (error) {
        console.error('Error al crear mascota:', error);
        return response.status(500).send({
            error: 'Hubo un error al crear el mascota. Por favor, inténtelo de nuevo.',
        });
    }
}

async function listarMascotas(request, response) {
    const page = request.query.page;
  
    const mascotas = await mascotaModel.find({});
  
    return response.send({ mascotas });
  }

  async function borrarMascota(request, response) {
    try {
        const mascotaId = request.params.mascotaId;
        const mascota = await mascotaModel.findById(mascotaId);

        if (!mascota) {
            return response.status(404).send({
                error: 'mascota no encontrado. No se realizó ninguna operación.',
            });
        }
        await mascotaModel.deleteOne({ _id: mascotaId });

        return response.status(200).send({
            success: true,
            message: 'mascota eliminado exitosamente.',
        });
    } catch (error) {
        console.error('Error al borrar mascota:', error);
        return response.status(500).send({
            error: 'Hubo un error al borrar el mascota. Por favor, inténtelo de nuevo.',
        });
    }
}

  async function editarMascota(request, response) {
    const mascotaId = request.params.mascotaId;
  
    const body = request.body;
  
    const mascota = await mascotaModel.updateOne(
      { _id: mascotaId },
      {
        ...body,
      },
      { new: true }
    );
  
    return response.send({ mascota });
  }

  async function obtenerUnaMascota(request, response) {
    try {
      const mascotaId = request.params.mascotaId;
  
      const mascota = await mascotaModel.findById(mascotaId);
  
      if (!mascota) {
        return response.status(404).send({ error: 'El mascota no existe' });
      }
  
      return response.send({ mascota });
    } catch (error) {
      response.status(500).send({ error });
    }
  }

export { crearMascota ,listarMascotas,borrarMascota,editarMascota,  obtenerUnaMascota};
