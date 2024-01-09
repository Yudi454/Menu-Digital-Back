const path = require("path");
const comidaModal = require("../models/comidaModel")
const fs = require("fs")

import { deleteObject, ref } from "firebase/storage";
import { uploadFile } from "../libs/uploadFile";
import { storage } from "../libs/firebase";

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
    console.log(req.body);
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
    console.log(req.body);
    try {
        //Logica pra encontrar la comida a editar
        const _id = req.params.id
        const {name,Price,Description} = req.body
        const comida = await comidaModal.findById(_id)
        //Si comida existe realiza esto
        if (comida) {
            comida.name = name || comida.name;
            comida.Price = Price || comida.Price;
            comida.Description = Description || comida.Description;
            //Si se envia un archivo
            if (req.file) {
                console.log("image existe");
                //Logica para encontrar la ruta de la imagen ya existente
                const fileRef = ref(storage, comida.Image)
                //Logica para eliminar la imagen ya existente
                await deleteObject(fileRef)
                //Logica agregar la nueva imagen
                const { downloadUrl } = await uploadFile(req.file)
                comida.Image = downloadUrl  
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
        //Logica para encontrar la comida a eliminar
        const id = req.params.id
        const comida = await comidaModal.findOne({_id: id})

        //Si comida existe realiza esta funcion
        if (comida) {
            //Logica para eliminar la imagen en Firebase
            const {Image} = comida
            const fileRef = ref(storage, Image)
            await deleteObject(fileRef)
            //Logica para eliminar la imagen en Mongo
            await comidaModal.findByIdAndDelete(id)
            return res.status(200).json({message: "Comida eliminada con exito"})
        } else{
            console.log(error);
            return  res.status(404).json({message: "Comida no encontrada"})
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: error})
    }
}

module.exports = {
    crearComida,
    getComida,
    editarComida,
    deleteComida,
    getComidaById
} 