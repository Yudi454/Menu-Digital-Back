const express = require("express")
const router = express.Router()

const bebidaController = require("../controllers/bebidaController")

//Get
router.get("/Bebida", bebidaController.getBebidas)
router.get("/Bebida/:id", bebidaController.getBebidaById)

//Post
router.post("/Bebida", bebidaController.crearBebida)

//Put
router.put("/Bebida/:id", bebidaController.editarBebida)

//Delete
router.delete("/Bebida/:id", bebidaController.deleteBebida)

module.exports = router