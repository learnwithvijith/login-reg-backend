const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')


const app = express()

app.use(cors())
app.use(express.json())

connectDB()


app.use('/api/users',userRoutes)


app.listen(8000,()=>{
    console.log("Server running on 8000")
})