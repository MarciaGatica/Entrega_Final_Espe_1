import usuarioModel from '../models/usuario.model.js';

async function obtenerUnUsuario(request, response) {
  try {
    const usuarioId = request.params.usuarioId;

    const usuario = await usuarioModel.findById(usuarioId);

    if (!usuario) {
      return response.status(404).send({
        error: 'El usuario no existe'
      });
    }

    return response.send({
      usuario
    });
  } catch (error) {
    response.status(500).send({
      error
    });
  }
}
async function listarUsuarios(request, response) {
  const page = request.query.page;

  const usuarios = await usuarioModel.find({});

  return response.send({
    usuarios
  });
}

async function crearUsuario(request, response) {
  try {
    const body = request.body;
    const camposRequeridos = ['nombre_usuario', 'clave', 'email', 'telefono', 'foto_usuario','isAdmin'];

    for (const campo of camposRequeridos) {
      if (!body[campo]) {
        return response.status(400).send({
          error: `El campo '${campo}' es obligatorio. Por favor, proporcione todos los campos requeridos.`,
        });
      }
    }
    const usuario = await usuarioModel.create({
      nombre_usuario: body.nombre_usuario,
      clave: body.clave,
      email: body.email,
      telefono: body.telefono,
      foto_usuario: body.foto_usuario,
      isAdmin: body.isAdmin,
    });

    return response.status(201).send({
      usuario,
      message: 'usuario creado exitosamente.',
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return response.status(500).send({
      error: 'Hubo un error al crear el usuario. Por favor, inténtelo de nuevo.',
    });
  }
}

async function borrarUsuario(request, response) {
  try {
      const usuarioId = request.params.usuarioId;
      const usuario = await usuarioModel.findById(usuarioId);

      if (!usuario) {
          return response.status(404).send({
              error: 'usuario no encontrado. No se realizó ninguna operación.',
          });
      }
      await usuarioModel.deleteOne({ _id: usuarioId });

      return response.status(200).send({
          success: true,
          message: 'usuario eliminado exitosamente.',
      });
  } catch (error) {
      console.error('Error al borrar usuario:', error);
      return response.status(500).send({
          error: 'Hubo un error al borrar el usuario. Por favor, inténtelo de nuevo.',
      });
  }
}

async function editarUsuario(request, response) {
  const usuarioId = request.params.usuarioId;

  const body = request.body;

  const usuario = await usuarioModel.updateOne(
    { _id: usuarioId },
    {
      ...body,
    },
    { new: true }
  );

  return response.send({ usuario });
}



export {
  obtenerUnUsuario,
  listarUsuarios,
  crearUsuario,
  borrarUsuario,
  editarUsuario
};