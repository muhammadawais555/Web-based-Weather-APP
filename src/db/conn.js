const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/FYP";
mongoose.set("strictQuery",true);
async function connect()
{
    try 
    {
        await mongoose.connect(uri);
        console.log("Connection established");
    } catch (error) 
    {
        console.log("Connection failed");
    }
}
connect();