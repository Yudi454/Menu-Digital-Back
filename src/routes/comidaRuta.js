const express = require("express")
const router = express.Router()
const upload = require("../libs/storage")

const comidaController = require("../controllers/comidaController")

//Get
router.get("/Comida", comidaController.getComida)
router.get("/Comida/:id", comidaController.getComidaById)

//Post
router.post("/Comida",upload.single(`Image`), comidaController.crearComida)

//Put
router.put("/Comida/:id",upload.single(`Image`), comidaController.editarComida)

//Delete
router.delete("/Comida/:id", comidaController.deleteComida)

module.exports = router