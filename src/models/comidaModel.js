const mongoose = require("mongoose");
const { Schema } = mongoose;

const host = process.env.HOST;
const port = process.env.PORT;

const comida = new Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 20,
  },
  Price: {
    type: Number,
    required: true,
    min: 1,
    max: 10000
  },
  Image: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
},{
    versionKey: false,
    collection: "Comidas"    
});

comida.methods.setImgUrl = function setImgUrl (filename) {
 this.Image = `${host}:${port}/public/${filename}`
}

const comidaModal = mongoose.model("Comidas", comida);

module.exports = comidaModal;
