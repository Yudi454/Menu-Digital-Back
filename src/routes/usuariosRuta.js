const express = require("express")
const router = express.Router()

const usuarioController = require("../controllers/usuarioController")
const tokenController = require("../controllers/tokenController")


//Get
router.get("/usuarios",tokenController.validateToken, usuarioController.getUsers)
router.get("/usuarios/:id",tokenController.validateToken, usuarioController.getUsuarioById)

//Post
router.post("/registro",tokenController.validateToken, usuarioController.register)
router.post("/login", usuarioController.login)

//Put
router.put("/usuarios/:id",tokenController.validateToken, usuarioController.editarUsuario)

//Delete
router.delete("/usuarios/:id",tokenController.validateToken, usuarioController.eliminarUsuario)

module.exports = router