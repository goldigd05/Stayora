const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const ejs = require("ejs");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash")
const { truncate } = require("fs");
//database set up code
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
//databse set up end 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}
app.get("/", (req, res) => {
    res.send("Hii its root url");  //frontend ko response 
})

app.use(session(sessionOptions))
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
//root url fisrt interface to user -home page


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
//ab agar uper kisi bhi api se kaam nhi hua to ye chlega agr koi bhi reqest wali url nhi mili random url mili toye chlega 
//api for all type url request 

// niche ka hander kisis bhi type ka eror aay auper api me to catch res of upcoming req then finds msg and status code then resend to ui 
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });

    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Server listening at port  8080");
});

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my home ",
//         description: "by near nbcc",
//         price: 12000,
//         location: "UP",
//         country: "India",

//     });
//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("sucessful testing");
// });  //for now we just saved data not show to frontend 



