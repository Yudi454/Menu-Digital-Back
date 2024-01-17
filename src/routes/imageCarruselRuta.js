const express = require("express")
const router = express.Router()
import {upload} from "../libs/multer"

const carruselController = require("../controllers/carruselController")

//Get
router.get("/ImgCarrusel", carruselController.getPromotionalImages)
router.get("/ImgComidas", carruselController.getComidasImages)
router.get("/imgBebidas", carruselController.getBebidasImages)
router.get("/ImgCarrusel/:id", carruselController.getPromotionalImagesById)

//Post
router.post("/ImgCarrusel",upload.single("Image"), carruselController.crearImageCarrusel)

//Put
router.put("/ImgCarrusel/:id",upload.single("Image"), carruselController.editImage)

//Delete
router.delete("/ImgCarrusel/:id", carruselController.deleteImage)

module.exports = router