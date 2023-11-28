const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarioModel");

//GET
const getUsers = async (req, res) => {
  console.log("pase get users");
  try {
    const users = await usuarioModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("Error:", error);
  }
};

const getUsuarioById = async (req, res) => {
  console.log("pase por get por id");
  try {
    const _id = req.params.id;
    const user = await usuarioModel.findById(_id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

//POST
const register = async (req, res) => {
    try {
        console.log("pase por registro");
        const { name, password } = req.body;
        const users = await usuarioModel.find();
        let userRepetido = users.find((user) => user.name == name);
    if (userRepetido) {
      res.status(200).json({ message: "Usuario ya creado" });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new usuarioModel({
        name,
        passwordHash,
      });
      await user.save();
      res.status(200).json({ message: "Usuario creado con exito" });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  console.log("pase por login");
  try {
    const user = await usuarioModel.findOne({ name: req.body.name });
    if (!user) {
      console.log("name no es correcto");
      return res
        .status(404)
        .json({ message: "Usuarios y/o contraseña incorrectos" });
    }
    const match = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!match) {
      console.log("contraseña no es correcta");
      return res
        .status(404)
        .json({ message: "Usuarios y/o contraseña incorrectos" });
    }

    res.header("auth-token").json({
      message: "Usuario logueado con exito",
    });
  } catch (error) {
    console.log(error);
  }
};

//PUT
const editarUsuario = async (req, res) => {
  console.log("pase por editar usuario");
  try {
    const _id = req.params.id;
    const { name, passwordHash } = req.body;
    const user = await usuarioModel.findById(_id);
    if (user) {
      user.name = name || user.name;
      user.passwordHash = passwordHash || user.passwordHash;
      await user.save();
      res.status(200).json({ message: "Usuario editado con exito" });
    } else {
      res.status(200).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};

//DELETE
const eliminarUsuario = async (req, res) => {
  console.log("pase por eliminar usuario");
  try {
    const id = req.params.id;
    await usuarioModel.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Usuario eliminado con exito" });
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};
module.exports = {
  getUsers,
  register,
  login,
  editarUsuario,
  eliminarUsuario,
  getUsuarioById,
};
