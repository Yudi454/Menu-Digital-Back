const express = require("express")
const router = express.Router()
import {upload} from "../libs/multer"

const bebidaController = require("../controllers/bebidaController")

//Get
router.get("/Bebida", bebidaController.getBebidas)
router.get("/Bebida/:id", bebidaController.getBebidaById)

//Post
router.post("/Bebida",upload.single("Image"), bebidaController.crearBebida)

//Put
router.put("/Bebida/:id", bebidaController.editarBebida)

//Delete
router.delete("/Bebida/:id", bebidaController.deleteBebida)

module.exports = router