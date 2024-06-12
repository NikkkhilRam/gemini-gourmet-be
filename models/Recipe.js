const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    ingredients: [String],
    cuisine: String,
    diet: String,
    recipe: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
