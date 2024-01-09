const express = require("express"); 
const router = express.Router(); 
const CartManager = require("../controllers/cart-manager.js"); 
const cartManager = new ProductManager("./src/models/carts.json"); 


//Crear carrito nuevo: 

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); 
        res.json(nuevoCarrito)
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error); 
        res.status(500).json({error: "Error del servidor"});
    }
});

//Lista de los productos que pertenecen a los carritos

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    

})

module.exports = router; 