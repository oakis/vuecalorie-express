import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    ingredients: {
        type: Array,
    },
    createdBy: {
        type: String,
        required: true,
    }
});
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
