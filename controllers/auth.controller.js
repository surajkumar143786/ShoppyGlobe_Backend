//import User model for interact with users collections
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

//for hashing the password
import bycrpt from 'bcryptjs'
import User from '../models/user.model.js';


//new user register
async function registerUser(req,res){
  try{
    // Extract user data from request body
    const {name,email,password} = req.body;
    
      //Check if all required fields are provided
    if(!name || !email || !password){
        return res.status(400).json({message:"all fields are required"})
    }
   //check if user is already exist with same emai
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message : "user already registered with this email"})
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(12)
    const hassedPassword = await bycrpt.hash(password , salt)
    
    //Create new user instance
    const newUser = new User({
        name,
        email,
        password: hassedPassword
    })

      //Save user to database
      await newUser.save()
    // Send success response
    return res.status(201).json({message : "user registered successfully"})


  }
  catch(err){
      //Handle unexpected errors
      return res.status(500).json({message : "sever error"})

  }
}

//login logic
async function loginUser(req,res){
    try{
        // extract email and password from request body
        const { email, password } = req.body;
        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "email and password is required" })
        }
        // find user by email
        const findUser = await User.findOne({ email })
        if (!findUser) {
            return res.status(400).json({ message: "invalid email" })
        }
        // compare entered password with hashed password
        const isPasswordMatch = await bcrypt.compare(password ,findUser.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "invalid password" })
        }
        // login successful
        // return res.status(200).json({ message: "login successfully" })
        // create JWT token
        const token = jwt.sign(
            {userId : findUser._id}, //payload(data inside token)
            process.env.SECRETKEY, //secrete key
            {expiresIn : "1h"}   //token expiry
            
    )
        // send token in response
        return res.status(200).json({ message: "login successfully", token: token })

        //server error handling
    } catch (err) {
        return res.status(500).json({ message: "server error" })
    }
} 


export { registerUser , loginUser}

