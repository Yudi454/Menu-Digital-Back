import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

const conectDb = require("./src/database/db");

console.log("Hola mundo");

const app = express();

app.set("port", process.env.PORT || 5050);

const initApp = async () => {
  try {
    await conectDb();
    app
      .listen(app.get("port"), () => {
        console.log(`Escuchando el puerto ${app.get("port")}`);
      })
      .on("error", (error) => {
        console.log(error);
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initApp();

// 1- middle nativo de express
app.use(express.json()); // permite recibir obj en formato json
app.use(express.urlencoded({ extended: true })); // permite recibir parametros en las rutas

app.use(morgan("dev")); // brinda detalles en nuestra terminal
app.use(cors()); // permite recibir peticiones remotas

app.use("/public", express.static(`${__dirname}/public/Images`))

//Rutas
app.use(
  "/api",
  require("./src/routes/usuariosRuta"),
  require("./src/routes/comidaRuta"),
  require("./src/routes/bebidaRuta"),
  require("./src/routes/imageCarruselRuta")
);
