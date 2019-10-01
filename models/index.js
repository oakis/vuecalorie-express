import mongoose from 'mongoose';
import Ingredient from './ingredient';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, options);
};

const models = {
    Ingredient,
};

export { connectDb };

export default models;
