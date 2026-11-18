const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },

    rating:
    {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAT:
    {
        type: Date,
        required: true,
        default: Date.now()
    },
});
const Review = mongoose.model("Review", reviewSchema);  //yaha se just table struction pass kiye hai bnayaa table and index.js me pass kiya aur uss table me data index.js ne hi  data.js se lekr insert kiya 
module.exports = Review;
// final listing collection jisme data hai proper vo exrt to app.js