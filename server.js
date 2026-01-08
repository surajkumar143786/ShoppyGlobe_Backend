//activate env file
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './controllers/config/db.js'
import router from './routes/auth.routes.js'
import productRoute from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'





const app = express()

//body parsing middleware
app.use(express.json())

app.use(cors());
app.use('/api',router)

app.use('/api',productRoute)

app.use('/api',cartRouter)


//DB connect
connectDB();


//roote route
app.get('/', (req, res) => {
    res.send("ShoppyGlobe Backend API is running")
})


//server create
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT${PORT}`)
})
