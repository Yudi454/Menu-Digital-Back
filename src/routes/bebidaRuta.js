const express = require("express")
const router = express.Router()
const upload = require("../libs/storage")

const bebidaController = require("../controllers/bebidaController")

//Get
router.get("/Bebida", bebidaController.getBebidas)
router.get("/Bebida/:id", bebidaController.getBebidaById)

//Post
router.post("/Bebida",upload.single(`Image`), bebidaController.crearBebida)

//Put
router.put("/Bebida/:id",upload.single(`Image`), bebidaController.editarBebida)

//Delete
router.delete("/Bebida/:id", bebidaController.deleteBebida)
module.exports = router