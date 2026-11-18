const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
    title: {

        type: String,
        required: true,
    },
    description:
    {
        type: String,
    },
    image: {
        type: String,
        default: "https://unsplash.com",
        set: (v) => v === "" ? "https://unsplash.com" : v
    },
    //set taki image user ne di pr kahli hai link uska bn hi nhi paya to ye use ,,default me jo agr koi image den ahi bhul jyae kkoi upload hi na ho to ye dikhana 
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,    //id save kr rhe hai 
        ref: "Review",                    //refrence le rhe hai 
    }]
});
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }//ab jb kdbi findOne and delte cla  hoga ye fun chlega aur aise kaam hoga 

});
const Listing = mongoose.model("Listing", listingSchema);  //yaha se just table struction pass kiye hai bnayaa table and index.js me pass kiya aur uss table me data index.js ne hi  data.js se lekr insert kiya 
module.exports = Listing;
// final listing collection jisme data hai proper vo exrt to app.js