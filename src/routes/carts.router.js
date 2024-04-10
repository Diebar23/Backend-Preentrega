const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller.js");
const cartController = new CartController(); 

router.post("/", cartController.newCart);
router.get("/:cid", cartController.getProductsFromCart);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete('/:cid/product/:pid', cartController.deleteProductFromCart);
router.put('/:cid', cartController.updateProductsInCart );
router.put('/:cid/product/:pid', cartController.updateQuantity);
router.delete('/:cid', cartController.emptyCart);

module.exports = router;