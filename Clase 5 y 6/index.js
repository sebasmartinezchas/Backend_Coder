const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

class Contenedor {
  constructor(fileName) {
    this.fileName = "./" + fileName + ".json";
  }

  async readData() {
    try {
      return await fs.promises.readFile(this.fileName, "utf-8");
    } catch (error) {
      if (error) {
        await fs.promises.writeFile(this.fileName, "[]", (error) => {
          console.log(error);
        });
      }
    }
  }

  async getAll() {
    try {
      let data = await this.readData();
      let jsonData = JSON.parse(data);
      console.log(jsonData);
      app.get("/productos", (req, res) => {
        res.send(jsonData);
      });
      return await jsonData;
    } catch (error) {
      console.log(error);
    }
  }

  async getRandomProduct() {
    try {
      let data = await this.readData();
      let jsonData = JSON.parse(data);
      let randomIndex = Math.floor(Math.random() * jsonData.length);
      let randomProduct = jsonData[randomIndex];
      app.get("/productoRandom", (req, res) => {
        res.send(randomProduct);
      });
      return randomProduct;
    } catch (error) {
      console.log("No he podido generar un producto al azar", error);
    }
  }
}

const contenedor2 = new Contenedor("products");
contenedor2.readData();

contenedor2.getAll();

contenedor2.getRandomProduct();
