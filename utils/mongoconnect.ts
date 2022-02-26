import mongoose from "mongoose"
import consola from "consola"
const connectToMongoose = async(TOKEN:string) => {
  if(!TOKEN) throw new Error("TOKEN is required")
  const connectMongoose = await mongoose.connect(TOKEN)
  if(!connectMongoose) throw new Error("Mongoose connection error")
  consola.info("Mongoose connected")
  return connectMongoose
}
export default connectToMongoose