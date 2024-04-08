import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ListingsAndReviewsSchema = new Schema({
    createdBy: { type: String, required: false },
    name: String,
    summary: String,
    space: String,
    description: String,
    neighborhood_overview: String,
    notes: String,
    transit: String,
    images: {
        thumbnail_url: { type: String, required: false },
        picture_url: { type: String, required: false }
    }
}, {
    collection: "listingsAndReviews",
    timestamps: true
})

const ListingsAndReviewsModel = mongoose.model('listingsAndReview', ListingsAndReviewsSchema);

export default ListingsAndReviewsModel;