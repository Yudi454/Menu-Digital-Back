const express = require("express")
const router = express.Router()
import {upload} from "../libs/multer"

const bebidaController = require("../controllers/bebidaController")
const tokenController = require("../controllers/tokenController")


//Get
router.get("/Bebida", bebidaController.getBebidas)
router.get("/Bebida/:id", bebidaController.getBebidaById)

//Post
router.post("/Bebida",tokenController.validateToken,upload.single("Image"), bebidaController.crearBebida)

//Put
router.put("/Bebida/:id",tokenController.validateToken,upload.single("Image"), bebidaController.editarBebida)

//Delete
router.delete("/Bebida/:id",tokenController.validateToken, bebidaController.deleteBebida)

module.exports = router