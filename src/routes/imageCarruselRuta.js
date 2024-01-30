const express = require("express")
const router = express.Router()
import {upload} from "../libs/multer"

const carruselController = require("../controllers/carruselController")
const tokenController = require("../controllers/tokenController")

//Get
router.get("/ImgCarrusel", carruselController.getPromotionalImages)
router.get("/ImgComidas", carruselController.getComidasImages)
router.get("/imgBebidas", carruselController.getBebidasImages)
router.get("/ImgCarrusel/:id", carruselController.getPromotionalImagesById)

//Post
router.post("/ImgCarrusel",tokenController.validateToken,upload.single("Image"), carruselController.crearImageCarrusel)

//Put
router.put("/ImgCarrusel/:id",tokenController.validateToken,upload.single("Image"), carruselController.editImage)

//Delete
router.delete("/ImgCarrusel/:id",tokenController.validateToken, carruselController.deleteImage)

module.exports = router