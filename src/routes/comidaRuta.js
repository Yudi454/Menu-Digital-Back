const express = require("express")
const router = express.Router()
import {upload} from "../libs/multer"

const comidaController = require("../controllers/comidaController")
const tokenController = require("../controllers/tokenController")

//Get
router.get("/Comida", comidaController.getComida)
router.get("/Comida/:id", comidaController.getComidaById)

//Post
router.post("/Comida",tokenController.validateToken,upload.single("Image"), comidaController.crearComida)

//Put
router.put("/Comida/:id",tokenController.validateToken,upload.single("Image"), comidaController.editarComida)

//Delete
router.delete("/Comida/:id",tokenController.validateToken, comidaController.deleteComida)

module.exports = router