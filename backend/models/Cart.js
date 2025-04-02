const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: String,
        image: String,
        price: Number,
        size: String,  // ✅ Fixed from Number to String
        color: String,
        quantity: {
            type: Number,
            default: 1,
        },
    },
    { id: false }
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        guestId: {
            type: String,
        },
        products: [cartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

cartSchema.pre("validate", function (next) {
    if (!this.user && !this.guestId) {
        next(new Error("Cart must belong to a user or a guest."));
    } else {
        next();
    }
});

module.exports = mongoose.model("Cart", cartSchema);
