const path = require("path");
const fs = require("fs");
const carruselModal = require("../models/carruselModel");

import { deleteObject, ref } from "firebase/storage";
import { uploadFile } from "../libs/uploadFile";
import { storage } from "../libs/firebase";

//GET
const getPromotionalImages = async (req, res) => {
  console.log("pase por imagenes promocionales");
  try {
    const images = await carruselModal.find();
    const imagesPromotional = images.filter(
      (image) => image.Function === "Promocional"
    );
    res.status(200).json(imagesPromotional);
  } catch (error) {
    console.log(error);
  }
};

const getBebidasImages = async (req, res) => {
  console.log("pase por get bebidas imagenes");
  try {
    const images = await carruselModal.find();
    const imagesBebidas = images.filter((image) => image.Function === "Bebida");
    res.status(200).json(imagesBebidas);
  } catch (error) {
    console.log(error);
  }
};

const getComidasImages = async (req, res) => {
  console.log("pase por get comidas imagenes");
  try {
    const images = await carruselModal.find();
    const imagesComidas = images.filter((image) => image.Function === "Comida");
    res.status(200).json(imagesComidas);
  } catch (error) {
    console.log(error);
  }
};

const getPromotionalImagesById = async (req, res) => {
  console.log(" pase por imagenes promocionales por id");
  try {
    const _id = req.params.id;
    const image = await carruselModal.findById(_id);
    res.status(200).json(image);
  } catch (error) {
    console.log(error);
  }
};

//POST
const crearImageCarrusel = async (req, res) => {
  console.log("pase por crear image carrusel");
  try {
    const { Position, Function } = req.body;
    const Image = req.file;
    const images = await carruselModal.find();
    const imageRepeat = images.find((image) => image.Position == Position && image.Function == Function);

    if (imageRepeat) {
      //Si el objeto esta repetido
      return res.status(200).json({ message: "Posicion ya en uso" });
    } else {
      //Logica para saber si estamos recibiendo una imagen
      if (Image) {
        const { downloadUrl } = await uploadFile(Image);

        //Si el objeto no existe y contiene una imagen
        const imageCarrusel = new carruselModal({
          Image: downloadUrl,
          Position,
          Function,
        });
        await imageCarrusel.save();
        return res
          .status(200)
          .json({ message: "Imagen creada con exito", imageCarrusel });
      }
      console.log("Debes enviar una imagen");
      return res.status(400).json({ message: "Debes enviar una imagen" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error });
  }
};

//PUT
const editImage = async (req, res) => {
  console.log("pase por editar imagen");
  try {
    const _id = req.params.id;
    const { Position, Function } = req.body;
    console.log("ID", _id);
    const image = await carruselModal.findById(_id);
    if (image) {
      image.Position = Position || image.Position;
      image.Function = Function || image.Function;
      if (req.file) {
        console.log("image existe");
        //Logica para encontrar la ruta de la imagen ya existente
        const fileRef = ref(storage, image.Image);
        //Logica para eliminar la imagen ya existente
        await deleteObject(fileRef);
        //Logica agregar la nueva imagen
        const { downloadUrl } = await uploadFile(req.file);
        image.Image = downloadUrl;
      }
      console.log(image);
      await image.save();
      res.status(200).json({ message: "Comida editada con exito" });
    } else {
      res.status(404).json({ message: "Comida no encontrada" });
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE
const deleteImage = async (req, res) => {
  console.log("pase por eliminar imagne");
  try {
    const id = req.params.id;
    const imagen = await carruselModal.findOne({ _id: id });

    if (imagen) {
      //Logica para eliminar la imagen en Firebase
      const {Image} = imagen
      const fileRef = ref(storage, Image)
      await deleteObject(fileRef)
      //Logica para eliminar la imagen en Mongo
      await carruselModal.findByIdAndDelete(id)
      return res.status(200).json({message: "Imagen eliminada con exito"})
    } else {
      console.log(error);
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  crearImageCarrusel,
  getPromotionalImages,
  getPromotionalImagesById,
  deleteImage,
  editImage,
  getBebidasImages,
  getComidasImages,
};
