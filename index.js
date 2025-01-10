import express from 'express';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import router from './routes/api.js';

const app = express();

//Global Application Middleware
app.use(cors());
app.use(express.json({limit:"30mb"}));
app.use(hpp()); // Query Parameter er duplication korte dei na. For example "http://localhost:8080/api/login?email=user@example.com&email=user@example.com" ata korte dibe na.
app.use(helmet());
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max:500
})
app.use(limiter);

//Web Caching
app.set("etag",false); //Cache memory te data rakbe na.

//MongoDB connection
mongoose.connect("http://mongodb.connect",{autoIndex:true}).then(()=>{
    console.log("DB connected Successfully");
}).catch((err)=>{
    console.log("DB connection failed : \n" + err);
})

app.use("/api",router);

app.listen(5000,()=>{
    console.log("Server Running on", 5000)
})