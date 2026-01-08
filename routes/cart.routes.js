import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import {addToCart , getCart, removeFromCart, updateCartQuantity} from '../controllers/cart.contoller.js'

const cartRouter = express.Router()

//add product to cart
cartRouter.post('/cart',authMiddleware,addToCart)

// remove product from cart
cartRouter.delete("/cart/:productId", authMiddleware, removeFromCart);

//get all items from cart
cartRouter.get('/cart',authMiddleware , getCart)

// update quantity of a specific product in cart
cartRouter.put('/cart/:productId', authMiddleware, updateCartQuantity);



export default cartRouter;