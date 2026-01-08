import product from "../models/product.model.js";
import mongoose from "mongoose";

// get all products
async function getAllProducts(req,res){

   try{
       // fetch all products from database
       const allProducts = await product.find();
       return res.status(200).json(allProducts)
   }
   // handle server error
   catch(err){
    return res.status(400).json({message : "server error while fetching products"})
   }
}



// get single product by id
async function getProductById(req,res){
    try{
        // extract product id from URL params
        const {id} = req.params
        // check valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        // find product by id
        const singleProduct = await product.findById(id)
        // if product not found
        if (!singleProduct){
            return res.status(404).json({message : "product not found"})
        }

        // send product data
        return res.status(200).json(singleProduct)
    }
    

    // handle invalid id or server error
catch (err) {
        return res.status(500).json({ message: "sever error" })
    }
}

//Create new Products
async function createProducts(req,res){
   try{
       // extract product data from request body
       const { name, price, description, stock } = req.body;
       // validation
       if (!name || !price || !description || !stock == undefined) {
           return res.status(400).json({ message: "All product fields are required" })
       }

       //create product 
       const newProduct = new product({
           name,
           price,
           description,
           stock
       })

       //save product to database 
       const savedProduct = await newProduct.save()  

       // return created product
       return res.status(201).json(savedProduct);

   } catch (error) {
       return res.status(500).json({
           message: "Server error while creating product",
       });
   }
   
}





export {getAllProducts, getProductById ,createProducts}