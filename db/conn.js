const mongoose=require("mongoose");

// const mongoUrl = 'mongodb://127.0.0.1:27017/Restaurant';


const connectToDatabase = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
      }).then(()=> console.log("Connected to the MongoDB database successfully")).catch((error)=> console.error("Error connecting to MongoDB:", error));   
  
module.exports = connectToDatabase;