const mongoose=require("mongoose")

async  function connectToMongoDB(url){
    return mongoose
            .connect(url)
            .then(()=>console.log("Server Connected to Database Successfully"))
            .catch((err)=> console.log("MongoDB Connection ERR is: ",err));
}
module.exports={connectToMongoDB};