const express = require("express");
const router = express.Router(); 
const ProductManager = require("../controllers/product-manager.js"); 
const productManager = new ProductManager("./src/models/products.json");


//Routing: 


router.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {

        console.error("Error al obtener productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})


router.get("/products/:pid", async (req, res) => {
    
    const id = req.params.pid;

    try {
        
        const product = await productManager.getProductById(parseInt(id)); 
        if (!product) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})

module.exports = router; 