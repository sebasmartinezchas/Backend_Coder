const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

let products = [
  {
    title: "Zapatillas Adidas",
    price: 25000,
    image:
      "https://tse4.mm.bing.net/th?id=OIP.0jpfkh-SBUX40AhpVUns9AHaHa&pid=Api&P=0",
    id: 1,
  },
  {
    title: "Camisa manga larga",
    price: 8500,
    image:
      "https://tse2.mm.bing.net/th?id=OIP.3U2oZ3g9ubysVOT80OeXPQHaHa&pid=Api&P=0",
    id: 2,
  },
  {
    title: "Vestido mujer",
    price: 32000,
    image:
      "http://4.bp.blogspot.com/-QOYsXzj0H3U/T_87VHwsYuI/AAAAAAAACGY/7Ccwy7uOvGs/s1600/vestido+amazon+j.jpg",
    id: 3,
  },
];
//GET:devuelve todos los productos
app.get("/api/productos/", (req, res) => {
  console.log("Hola Mundo");
  res.json(products);
});

//GET:devuelve el producto según el ID específicado en el parametro
app.get("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const found = products.find((element) => element.id == id);
  if (found) {
    res.json(found);
  } else {
    res.json({ error: "producto no encontrado" });
  }
});

//POST:body sin ID, se genera automáticamente
app.post("/api/productos", (req, res) => {
  const { body } = req;
  body.id = 1;
  let productArray = [];
  const index = products.map((x) => x.id).sort((a, b) => a.id - b.id);
  body.id = index[index.length - 1] + 1;

  if (!body.id) {
    body.id = 1;
    productArray = [{ ...body }];
    return productArray[0].id;
     
    
  } else {
    products.push(body);
    res.json('Hola Mundo')
    console.log(products)
}})
