import express from 'express'
import { createProducts, getAllProducts, getProductById } from '../controllers/product.controller.js';

const productRoute = express.Router()

// route to get all products
productRoute.get('/products' ,getAllProducts)

//route to get particular products
productRoute.get("/products/:id" , getProductById)

// create product
productRoute.post("/products", createProducts);


export default productRoute;