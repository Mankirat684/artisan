import express from "express"; 
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());


//routes
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

export default app;
