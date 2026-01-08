import mongoose  from "mongoose";

const cartSchema = new mongoose.Schema(
    {
    // reference to user
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    // cart items
    items :[
        {
        product: {
            type:mongoose.Schema.Types.ObjectId,
            ref : "product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    },    
    ],  
},
{
        timestamps: true,
    }
)

const Cart = mongoose.model("Cart",cartSchema)

export default Cart;