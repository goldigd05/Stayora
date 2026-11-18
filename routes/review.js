const express = require("express");
const ejs = require("ejs");
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const router = express.Router({ mergeParams: true });
9
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, error);
    }
    else {
        next();
    }
}
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "new review created");
    res.redirect(`/listings/${id}`);

}));

router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let id = req.params.id.trim();
    let reviewId = req.params.reviewId.trim();
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //kya kiyA KI PULL KE ACCORDING GIVE REVIEW ARRAYSE ID NIKALO AUR USSE BHEJO UPDAT EKO VO US  ID KI BVALUSE KO DELETE KRENEG ur updat eme jo  id hai vo listing ki id hai vol rha hai  id id ki lisritng me jao uska review aray se ye delete kr do review 
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "new review deleted");
    res.redirect(`/listings/${id}`);
}))

module.exports = router;
