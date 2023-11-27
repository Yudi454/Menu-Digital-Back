const mongoose = require("mongoose");
const { Schema } = mongoose;

const host = process.env.HOST;
const port = process.env.PORT;

const imageCarrusel = new Schema({
  Image: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  Function: {
    type: String,
    required: true
  }
},{
    versionKey: false,
    collection: "Carrusel"    
});

imageCarrusel.methods.setImgUrl = function setImgUrl (filename) {
 this.Image = `${host}:${port}/public/${filename}`
}

const carruselModal = mongoose.model("Carrusel", imageCarrusel);

module.exports = carruselModal;
