const monogoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async()=>{
    try{
         await monogoose.connect(process.env.DB_URI)
        console.log('DB connected successfully')

    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB