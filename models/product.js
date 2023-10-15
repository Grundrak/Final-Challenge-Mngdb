const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name: String,
    price: Number,
    availability: Boolean,
    data: {type: Date, default: Date.now}
});

const Product = mongoose.model('Produit', productschema);

module.exports = Product;
