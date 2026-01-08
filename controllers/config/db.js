// suraj143786000_db_user
//9WQPH189XVz8LT0E

// mongoose import for db connection
import mongoose from "mongoose";

// function for db connection
const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB Connected Successfully");
        })
        .catch((err) => {
            console.log("DB not Connected!!");
            console.log(err.message);
        });
};

export default connectDB;
