const moongose = require("mongoose");
const { Schema } = moongose;

const host = process.env.HOST;
const port = process.env.PORT;

const bebida = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 15,
    },
    Price: {
      type: Number,
      required: true,
      min: 100,
      max: 100000,
    },
    Image: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    collection: "Bebidas",
  }
);

bebida.methods.setImgUrl = function setImgUrl (filename) {
  this.Image = `${host}:${port}/public/${filename}`
 }

const bebidaModal = moongose.model("Bebidas", bebida);

module.exports = bebidaModal;
