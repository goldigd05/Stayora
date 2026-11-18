const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const ejs = require("ejs");
const Listing = require("../models/listing.js");
const router = express.Router();
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // body ki chije aur  scheme me jo chije constrian set hai validate kro ki sahi hai ya glt amtch hai ya eror 

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, error);
    }
    else {
        next();
    }
    // if (!req.body.Lisiting) {
    //     throw new ExpressError(400, "Send valid data  for listing");
    // }
}
// all product photos  page, all pages here 
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
})
//just for undderstandigs
// Listing.find({}).then((res) => {   
//     //ye listing name ke collection me jo data ya model ya collection  hai use lekr frotnd ko rner kr rhi hai ye jsut data  import krke pass kr rh hai 
//     console.log(res); 
// });
router.get("/new", async (req, res) => {
    res.render("./listings/new.ejs");
});
router.post("/", validateListing,
    wrapAsync(async (req, res, next) => {


        const newListing = new Listing(req.body.listing);
        //way 1
        // if (!newListing.title) {
        //     throw new ExpressError(400, "Send valid title for listing");
        // }

        await newListing.save();
        req.flash("success", "New Listing Created");
        res.redirect("/listings");

    })
);
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "This listing does not exist");
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });

})
);
router.put("/:id",
    validateListing,
    wrapAsync(async (req, res) => {

        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        req.flash("success", "listing updated");
        res.redirect(`/listings/${id}`);
    })
);

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        req.flash("error", "This listing does not exist");
        return res.redirect("/listings");
    }
    //databse se nikal air sb ek varibale me krke aage bhej diya aur vo rende rho bhi gya so cute
    res.render("./listings/show.ejs", { listing });
});
router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "new listing deleted");
    res.redirect("/listings");
});

module.exports = router;