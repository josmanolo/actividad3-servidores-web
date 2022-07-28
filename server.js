const express = require('express');
const Contenedor = require("./contenedor");

const app = express();
const productsContainer = new Contenedor('./productos.txt');

app.get('/api/products', (req, res) => {
   let products = productsContainer.getAll();

   const getProducts = async () => {
      try {
         const data = await products;
         res.json(data)
      } catch (error) {
         res.json(error);
      }
   }

   getProducts();
});

app.get('/api/randomProducts', (req, res) => {
   let products = productsContainer.getAll();
   
   const getProducts = async () => {
      try {
         const data = await products;
         const randomProduct = data[Math.floor(Math.random()*data.length)];
         res.json(randomProduct)
      } catch (error) {
         res.json(error);
      }
   }

   getProducts();
});

const PORT = 8080;
const server = app.listen(PORT, () => {
   console.log(`Server running on port ${server.address().port}`)
})