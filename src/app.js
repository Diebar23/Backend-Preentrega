const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//Routing: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//Listen
app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);

});
