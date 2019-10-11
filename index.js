require('dotenv').config();
import config from 'config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import { connectDb } from './models';

const app = express();

if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/recipes', routes.recipes);
app.use('/ingredients', routes.ingredients);
app.use('/user', routes.user);

const port = process.env.PORT || 4000;
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`listening on ${port}`);
    });
});
