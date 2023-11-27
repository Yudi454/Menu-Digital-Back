const express = require("express")
const router = express.Router()

const usuarioController = require("../controllers/usuarioController")

//Get
router.get("/usuarios", usuarioController.getUsers)
router.get("/usuarios/:id", usuarioController.getUsuarioById)

//Post
router.post("/registro", usuarioController.register)
router.post("/login", usuarioController.login)

//Put
router.put("/usuarios/:id", usuarioController.editarUsuario)

//Delete
router.delete("/usuarios/:id", usuarioController.eliminarUsuario)

module.exports = router