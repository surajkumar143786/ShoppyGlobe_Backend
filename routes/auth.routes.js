// Import express to create router
import express from 'express'

//import registerUser controller function
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';



// Create router instance
const router = express.Router()

//create route for registerUser
router.post('/register',registerUser)

//create route for login
router.post('/login',loginUser)

//create test protected route
router.get('/profile',authMiddleware ,(req,res) =>{
    res.status(200).json({
        message: "Access granted",
        userId: req.userId,
    });
})

export default router;