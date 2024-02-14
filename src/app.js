const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;
require("./database.js"); //Inicializador de datos

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Routing: 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.get("/api/products", async (req, res) => {
    const page = req.query.page || 1;
    const limit = 2; 

    try {
        const productsList = await productModel.paginate({}, {limit, page})

        const productFinal = productsList.docs.map(pizza => {
            const {_id, ...rest} = product.toObject();
            return rest;
        })
        

        res.render("products", {
            product: productFinal,
            hasPrevPage: productsList.hasPrevPage,
            hasNextPage: productsList.hasNextPage,
            prevPage: productsList.prevPage, 
            nextPage: productsList.nextPage,
            currentPage: productsList.page,
            totalPages: productsList.totalPages
        });
    } catch (error) {
        console.log("Error en la paginacion ", error); 
        res.status(500).send("Error en el server");
    }
})

//Listen
const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);

})