import horaModel from '../models/hora.model.js';


async function crearHora(request, response) {
    try {
        const body = request.body;
        const camposRequeridos = ['fecha', 'hora', 'nombre_mascota','especie','encargado','id_usuario','motivo'];

        for (const campo of camposRequeridos) {
            if (!body[campo]) {
                return response.status(400).send({
                    error: `El campo '${campo}' es obligatorio. Por favor, proporcione todos los campos requeridos.`,
                });
            }
        }
        const hora = await horaModel.create({
            fecha: body.fecha,
            hora: body.hora,
            nombre_mascota: body.nombre_mascota,
            especie: body.especie,
            encargado: body.encargado,
            id_usuario: body.id_usuario,
            motivo: body.motivo,
        });

        return response.status(201).send({
            hora,
            message: 'hora creado exitosamente.',
        });
    } catch (error) {
        console.error('Error al crear hora:', error);
        return response.status(500).send({
            error: 'Hubo un error al crear el hora. Por favor, inténtelo de nuevo.',
        });
    }
}

async function listarHoras(request, response) {
    const page = request.query.page;
  
    const hora = await horaModel.find({});
  
    return response.send({ hora });
  }

  async function borrarHora(request, response) {
    try {
        const horaId = request.params.horaId;
        const hora = await horaModel.findById(horaId);

        if (!hora) {
            return response.status(404).send({
                error: 'hora no encontrado. No se realizó ninguna operación.',
            });
        }
        await horaModel.deleteOne({ _id: horaId });

        return response.status(200).send({
            success: true,
            message: 'hora eliminado exitosamente.',
        });
    } catch (error) {
        console.error('Error al borrar hora:', error);
        return response.status(500).send({
            error: 'Hubo un error al borrar el hora. Por favor, inténtelo de nuevo.',
        });
    }
}

  async function editarHora(request, response) {
    const horaId = request.params.horaId;
  
    const body = request.body;
  
    const hora = await horaModel.updateOne(
      { _id: horaId },
      {
        ...body,
      },
      { new: true }
    );
  
    return response.send({ hora });
  }

  async function obtenerUnaHora(request, response) {
    try {
      const horaId = request.params.horaId;
  
      const hora = await horaModel.findById(horaId);
  
      if (!hora) {
        return response.status(404).send({ error: 'El hora no existe' });
      }
  
      return response.send({ hora });
    } catch (error) {
      response.status(500).send({ error });
    }
  }

export {crearHora, listarHoras, borrarHora, editarHora, obtenerUnaHora };
