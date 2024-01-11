const bebidaModal = require("../models/bebidaModel")
const path = require("path");
const fs = require("fs")

import { deleteObject, ref } from "firebase/storage";
import { uploadFile } from "../libs/uploadFile";
import { storage } from "../libs/firebase";

//GET
const getBebidas = async (req,res) => {
    console.log("pase por traer bebidas");
    try {
        const bebidas = await bebidaModal.find()
        res.status(200).json(bebidas)
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

const getBebidaById = async (req,res) => {
    console.log("pase por bebida by id");
    try {
        const _id = req.params.id
        const bebida = await bebidaModal.findById(_id)
        res.status(200).json(bebida)
    } catch (error) {
        console.log(error);
    }
}

//POST
const crearBebida = async (req,res) => {
    console.log("pase por crear bebida");
    try {
        //Caracteristicas del objeto
        const {name,Price,Description} = req.body
        const Image = req.file
        //Logica por si el objeto esta repetido
        const bebidas = await bebidaModal.find()
        const bebidaRepetida = bebidas.find((bebida) => bebida.name == name )
        if (bebidaRepetida) {
            //Si el objeto esta repetido
           return res.status(200).json({message: "Bebida ya creada"})
        } else {
            //Logica para saber si estamos recibiendo una imagen
            if (Image ) {
                const {downloadUrl} = await uploadFile(Image) 
  
                //Si el objeto no existe y contiene una imagen
                const bebida = new bebidaModal({
                    name,
                    Price,
                    Image: downloadUrl,
                    Description
                })
                await bebida.save()
               return res.status(200).json({message: "Bebida creada con exito", bebida})
                
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
const editarBebida = async (req,res) => {
    console.log("pase por editar bebida");
    try {
        //Logica pra encontrar la comida a editar
        const _id = req.params.id
        const {name,Price,Description} = req.body
        const bebida = await bebidaModal.findById(_id)
        //Si bebida existe realiza esto
        if (bebida) {
            bebida.name = name || bebida.name;
            bebida.Price = Price || bebida.Price;
            bebida.Description = Description || bebida.Description;
            //Si se envia un archivo
            if (req.file) {
                console.log("image existe");
                //Logica para encontrar la ruta de la imagen ya existente
                const fileRef = ref(storage, bebida.Image)
                //Logica para eliminar la imagen ya existente
                await deleteObject(fileRef)
                //Logica agregar la nueva imagen
                const { downloadUrl } = await uploadFile(req.file)
                bebida.Image = downloadUrl  
            }
            await bebida.save();
            res.status(200).json({message: "Bebida editada con exito"})
        } else {
            res.status(404).json({message: error})
        }
    } catch (error) {
        res.status(404).json({message: error})
    }
}

//DELETE
const deleteBebida = async (req,res) => {
    console.log("pase por delete bebida");
    try {
        //Logica para encontrar la comida a eliminar
        const id = req.params.id
        const bebida = await bebidaModal.findOne({_id: id})

        //Si comida existe realiza esta funcion
        if (bebida) {
             //Logica para eliminar la imagen en Firebase
             const {Image} = bebida
             const fileRef = ref(storage, Image)
             await deleteObject(fileRef)
             //Logica para eliminar la imagen en Mongo
             await bebidaModal.findByIdAndDelete(id)
             return res.status(200).json({message: "Bebida eliminada con exito"})
        } else{
            console.log(error);
            res.status(404).json({message: "Bebida no encontrada"})
        }
    } catch (error) {
        res.status(404).json({message: error})
    }
}

module.exports = {
    crearBebida,
    getBebidas,
    editarBebida,
    deleteBebida,
    getBebidaById
}