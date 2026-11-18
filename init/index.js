const mongoose = require("mongoose");
const initData = require("./data.js");
require("dotenv").config({ path: "../.env" });
//databse setup code 
const Listing = require("../models/listing.js");
const MONGO_URL = process.env.MONGO_URL;
main().then(() => {
    console.log("Connected to db");
})
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

//db setup ends
//db initialize with existing data
const initDB = async () => {
    await Listing.deleteMany({});  //phle sb delete kro then 
    await Listing.insertMany(initData.data);  //all data inserted  here from importing data from data.js
    //ab vo data  isme hai jo humne alg sead don kiya hai 
    console.log("data initialized");
}
initDB();