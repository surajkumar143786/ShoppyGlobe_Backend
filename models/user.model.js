import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
        //user full name
        name: {
            type: String,
            required: true
        },

        //user email 
        email:{
            type: String,
            required : true,
            unique : true
        },

        //user password
        password:{
            type:String,
            required:true,
        },

  },

  {
    //createdAt and updatedAt automatically : used for tracking and auditing data
        timestamps: true
    }

)
const User = mongoose.model("User", userSchema)

export default User;