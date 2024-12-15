
import mogoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
 

const connectDB=async(req,res)=>{
    try {
        await mogoose.connect(`${process.env.dbUrl}/${process.env.dbName}`)
        console.log("db connected")
    } catch (error) {
      console.log(error)
    }
}

export default connectDB