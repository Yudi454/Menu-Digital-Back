const path = require("path");
const comidaModal = require("../models/comidaModel")
const fs = require("fs")

import { uploadFile } from "../libs/uploadFile";

//GET
const getComida = async (req,res) => {
    console.log("pase por get comida");
    try {
        const comidas = await comidaModal.find()
        res.status(200).json(comidas)
    } catch (error) {
        console.log(error);
    }
}

const getComidaById = async (req,res) => {
    console.log("pase por get comida by id");
    try {
        const _id = req.params.id
        const comida = await comidaModal.findById(_id)
        res.status(200).json(comida)
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

//POST
const crearComida = async (req,res) => {
    console.log("pase por crear comida");
    try {
        //Caracteristicas del objeto
        const {name,Price,Description} = req.body
        const Image = req.file 
        //Logica por si el objeto esta repetido
        const comidas = await comidaModal.find()
        const comidaRepetida = comidas.find((comida) => comida.name == name )
        if (comidaRepetida) {
            //Si el objeto esta repetido
           return res.status(200).json({message: "Comida ya creada"})
        } else {
            //Logica para saber si estamos recibiendo una imagen
            console.log(Image);
            if (Image ) {
              const {downloadUrl} = await uploadFile(Image) 

              //Si el objeto no existe y contiene una imagen
              const comida = new comidaModal({
                  name,
                  Price,
                  Image: downloadUrl,
                  Description
              })
              await comida.save()
             return res.status(200).json({message: "Comida creada con exito", comida})
              
            }
            console.log("Debes enviar una imagen");
            return res.status(400).json({message: "Debes enviar una imagen"})
        }
    } catch (error) {
        console.log(error);
       return res.status(404).json({message: error})
    }
}

//PUT

const editarComida = async (req,res) => {
    console.log("pase por editar comida");
    try {
        const _id = req.params.id
        const {name,Price,Image,Description} = req.body
        const comida = await comidaModal.findById(_id)
        if (comida) {
            comida.name = name || comida.name;
            comida.Price = Price || comida.Price;
            comida.Image = Image || comida.Image;
            comida.Description = Description || comida.Description;
            if (req.file) {
                console.log("image existe");
                const imageUrl = comida.Image;
                const urlParts = imageUrl.split("/");
                const fileName = urlParts[urlParts.length -1]
                const rutaArchivo = path.resolve(__dirname, "../../public/Images", fileName)
                fs.unlinkSync(rutaArchivo)

                const { filename } = req.file
                comida.setImgUrl(filename)  
            }
            await comida.save();
            res.status(200).json({message: "Comida editada con exito"})
        } else {
            res.status(404).json({message: "Comida no encontrada"})
        }
    } catch (error) {
        console.log(error);
    }
}

//DELETE
const deleteComida  = async(req,res) => {
    console.log("pase por delete comida");
    try {
        const id = req.params.id
        const comida = await comidaModal.findOne({_id: id})

        if (comida) {
            const imageUrl = comida.Image;
            const urlParts = imageUrl.split("/");
            const fileName = urlParts[urlParts.length -1]

            const rutaArchivo = path.resolve(__dirname, "../../public/Images", fileName)

            fs.unlinkSync(rutaArchivo)

            await comidaModal.findOneAndDelete({_id: id})
            res.status(200).json({message: "Comida eliminada con exito"})
        } else{
            console.log(error);
            res.status(404).json({message: "Comida no encontrada"})
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error})
    }
}

module.exports = {
    crearComida,
    getComida,
    editarComida,
    deleteComida,
    getComidaById
} 