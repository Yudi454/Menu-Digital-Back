const bebidaModal = require("../models/bebidaModel")
const path = require("path");
const fs = require("fs")

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
        const {name,Price,Image,Description} = req.body
        const bebidas = await bebidaModal.find()
        const bebidaRepetida = bebidas.find((bebida) => bebida.name == name )
        if (bebidaRepetida) {
            res.status(200).json({message: "Bebida ya creada"})
        } else {
            const bebida = new bebidaModal({
                name,
                Price,
                Image,
                Description
            });
            if (req.file) {
                const { filename } = req.file
                bebida.setImgUrl(filename)  
            }
            await bebida.save();
            res.status(200).json({message: "Bebida creada con exito"})
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({message: `${error}`})
    }
}

//PUT
const editarBebida = async (req,res) => {
    console.log("pase por editar bebida");
    try {
        const _id = req.params.id
        const {name,Price,Image,Description} = req.body
        const bebida = await bebidaModal.findById(_id)
        if (bebida) {
            bebida.name = name || bebida.name;
            bebida.Price = Price || bebida.Price;
            bebida.Image = Image || bebida.Image;
            bebida.Description = Description || bebida.Description;
            if (req.file) {
                const { filename } = req.file
                bebida.setImgUrl(filename)  
            }
            await bebida.save();
            res.status(200).json({message: "Bebida editada con exito"})
        } else {
            res.status(404).json({message: `${error}`})
        }
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

//DELETE
const deleteBebida = async (req,res) => {
    console.log("pase por delete bebida");
    try {
        const id = req.params.id
        const bebida = await bebidaModal.findOne({_id: id})

        if (bebida) {
            const imageUrl = bebida.Image;
            const urlParts = imageUrl.split("/");
            const fileName = urlParts[urlParts.length -1]

            const rutaArchivo = path.resolve(__dirname, "../../public/Images", fileName)

            fs.unlinkSync(rutaArchivo)

            await bebidaModal.findOneAndDelete({_id: id})
            res.status(200).json({message: "Comida eliminada con exito"})
        } else{
            console.log(error);
            res.status(404).json({message: "Comida no encontrada"})
        }
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }
}

module.exports = {
    crearBebida,
    getBebidas,
    editarBebida,
    deleteBebida,
    getBebidaById
}