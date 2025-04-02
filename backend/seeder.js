const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data

const seedData = async () => {
    try{
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await cart.deleteMany();

        // Create a default admin user
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",
        });

        // Assign the default user ID to each product
        const userID = createdUser.id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };
        });

        // Insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully ")
        process.exit();
    } catch (error) {
        console.error("Error seeding the data : ", error);
        process.exit();
    }
};

seedData();