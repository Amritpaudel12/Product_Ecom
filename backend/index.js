
import express from 'express'

import dotenv from 'dotenv' 
import { connectDB } from './dbConfig/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import UserRouter from './routes/user.route.js' 
import productRouter from './routes/product.route.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json()) 
app.use(cookieParser())

connectDB()
.then(res => {
    app.listen(PORT, () => {
        console.log(`The Server is listening at PORT ${PORT}`);
    })
})
.catch(error => {
    console.log(`Connection Error ${error.message}`);
})

app.use('/api/user', UserRouter);
app.use('/api/product', productRouter);