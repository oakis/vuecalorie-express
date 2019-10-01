import mongoose from 'mongoose';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, options);
};

const models = {};

export { connectDb };

export default models;
