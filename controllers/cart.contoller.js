import Cart from "../models/cart.model.js"
import product from "../models/product.model.js";

//  ADD PRODUCT TO CART

async function addToCart(req,res){
    try{
        // userId comes from JWT middleware
        const userId = req.userId
       //productId and quantity comes from body
       const{productId,quantity} = req.body
        // basic validation
        if (!productId){
            return res.status(400).json({message : "productId is required"})
        }
        // check product exists or not
        const productExist = await product.findById(productId)
        if (!productExist){
            return res.status(404).json({message : "product not found"})
        }
        // find cart of logged-in user
        let cart = await Cart.findOne({user :userId })

        // find cart of logged-in user
       if(!cart){
        cart = new Cart({
            user : userId,
            items:[{
               product : productId,
                quantity :quantity ||1
            }]
        })
       } else {
           // check if product already exists in cart
           const productIndex = cart.items.findIndex(
               (item) => item.product.toString() === productId
           );

           if (productIndex > -1) {
               // product already in cart - increase quantity
               cart.items[productIndex].quantity += quantity || 1;
           } else {
               // product not in cart → add new product
               cart.items.push({
                   product: productId,
                   quantity: quantity || 1,
               });
           }
        } 

        // save cart
        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart,
        });
        

    } catch (error) {
        console.log("ADD TO CART ERROR", error);
        return res.status(500).json({
            message: "Server error while adding to cart",
    })
}
}

// REMOVE PRODUCT FROM CART
async function removeFromCart(req, res) {
    try {
        const userId = req.userId;
        const { productId } = req.params;

        // find user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        // filter out the product
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        // save updated cart
        await cart.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart,
        });
    } catch (error) {
        console.log("REMOVE FROM CART ERROR", error);
        return res.status(500).json({
            message: "Server error while removing product from cart",
        });
    }
}

// GET ALL CART ITEMS FOR LOGGED-IN USER
async function getCart(req, res) {
    try {
        // userId comes from authMiddleware (JWT decoded)
        const userId = req.userId;

        // Find cart for this user
        const cart = await Cart.findOne({ user: userId })
            .populate("items.product"); // populate product details

        // If cart not found (user never added anything)
        if (!cart) {
            return res.status(200).json({
                message: "Cart is empty",
                cart: [],
            });
        }

        // If cart exists, return cart data
        return res.status(200).json(cart);

    } catch (error) {
        console.log("GET CART ERROR", error);
        return res.status(500).json({
            message: "Server error while fetching cart",
        });
    }
}

// UPDATE PRODUCT QUANTITY IN CART
async function updateCartQuantity(req, res) {
    try {
        const userId = req.userId;           // from JWT
        const { productId } = req.params;    // from URL
        const { quantity } = req.body;       // from body

        // validation
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be greater than 0",
            });
        }

        // find user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        // find product inside cart
        const productIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart",
            });
        }

        // update quantity
        cart.items[productIndex].quantity = quantity;

        // save cart
        await cart.save();

        return res.status(200).json({
            message: "Cart quantity updated successfully",
            cart,
        });

    } catch (error) {
        console.log("UPDATE CART ERROR", error);
        return res.status(500).json({
            message: "Server error while updating cart",
        });
    }
}


export { addToCart, removeFromCart, getCart, updateCartQuantity }