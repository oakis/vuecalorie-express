import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    ingredients: {
        type: Array,
    }
});
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
