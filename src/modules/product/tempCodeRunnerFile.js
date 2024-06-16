const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        min: 2,


    },
    slug: {
        type: String,
        unique: true
    },
    summary: {
        type: String,
        required: true
    }
})