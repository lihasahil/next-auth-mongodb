import mongoose from "mongoose";

export async function connctDb() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb Connected");
    });

    connection.on("errror", (error) => {
      console.log("MongoDb Connection Error" + error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting DB");
    console.log(error);
  }
}
