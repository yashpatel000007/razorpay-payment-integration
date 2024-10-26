import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_NAME
    });
    console.log("---***Database Connected Successfully***---")
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongo;