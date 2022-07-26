const fs = require("fs");

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

  async save(objeto) {
    try {
      objeto.id = 1;
      let data = await this.readData();
      let jsonData = JSON.parse(data);
      let productArray = [];
      const index = jsonData.map((x) => x.id).sort((a, b) => a.id - b.id);
      objeto.id = index[index.length - 1] + 1;

      if (!objeto.id) {
        objeto.id = 1;
        productArray = [{ ...objeto }];
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(productArray),
          (e) => {
            return productArray[0].id;
          }
        );
      } else {
        jsonData.push(objeto);

        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(jsonData),
          (e) => {
            console.log("No pude grabar");
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      let data = await this.readData();
      let jsonData = JSON.parse(data);
      let getId = jsonData.find((e) => e.id === id);
      if (getId) return console.log(getId);
      console.log("El id no existe");
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      let data = await this.readData();
      let jsonData = JSON.parse(data);
      console.log(jsonData);
      return await jsonData;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      let data = await this.readData();
      let jsonData = JSON.parse(data);
      let deleteId = jsonData.find((e) => e.id === id);
      let deleteIndex = jsonData.indexOf(deleteId);
      if (deleteIndex > 0) {
        jsonData.splice(deleteIndex, 1);
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(jsonData),
          (error) => {
            console.log("El objeto fue eliminado", error);
          }
        );
      }
    } catch (error) {
      console.log("No pude eliminar el archivo", error);
    }
  }
  async deleteAll() {
    try {
      let data = await this.readData();
      let jsonData = JSON.parse(data);
      await fs.promises.writeFile(this.fileName, "[]", (error) => {
        console.log("No pude eliminar los objetos", error);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

let product1 = {
  title: "Zapatillas Adidas",
  price: 25000,
  image:
    "https://tse4.mm.bing.net/th?id=OIP.0jpfkh-SBUX40AhpVUns9AHaHa&pid=Api&P=0",
};
let product2 = {
  title: "Camisa manga larga",
  price: 8500,
  image:
    "https://tse2.mm.bing.net/th?id=OIP.3U2oZ3g9ubysVOT80OeXPQHaHa&pid=Api&P=0",
};
let product3 = {
  title: "Vestido mujer",
  price: 32000,
  image:
    "http://4.bp.blogspot.com/-QOYsXzj0H3U/T_87VHwsYuI/AAAAAAAACGY/7Ccwy7uOvGs/s1600/vestido+amazon+j.jpg",
};

const contenedor2 = new Contenedor("products");
// contenedor2.readData();
// contenedor2.save(product3);
// // contenedor2.save(product2);
// // contenedor2.save(product3);
// contenedor2.getById(3)
// contenedor2.getAll()
// contenedor2.deleteById(2)
// contenedor2.deleteAll()
