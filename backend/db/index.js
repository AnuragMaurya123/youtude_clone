import mongooose from "mongoose";
import { dbName } from "../src/constant.js";

export default async function dbConnect() {
  try {
    const connectionInstance=await mongooose.connect(`${process.env.MONGOURL}/${dbName}`);
    if (connectionInstance.connection.host) {
        console.log("Database is connected");
    }    
  } catch (error) {
    console.log("Error in Database Connection Process",error);
    process.exit(1)
  }
}
