const express = require("express")
const router = express.Router()

const carruselController = require("../controllers/carruselController")

//Get
router.get("/ImgCarrusel", carruselController.getPromotionalImages)
router.get("/ImgComidas", carruselController.getComidasImages)
router.get("/imgBebidas", carruselController.getBebidasImages)
router.get("/ImgCarrusel/:id", carruselController.getPromotionalImagesById)

//Post
router.post("/ImgCarrusel", carruselController.crearImageCarrusel)

//Put
router.put("/ImgCarrusel/:id", carruselController.editImage)

//Delete
router.delete("/ImgCarrusel/:id", carruselController.deleteImage)

module.exports = router