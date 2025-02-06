## Best practices and File Folder Structure:
- ### Run on Terminal : `npm init --y`
- ### Run on Terminal : `npm i express cookie-parser body-parser cors express-rate-limit helmet hpp jsonwebtoken mongoose nodemailer nodemon ejs`
- ### Run on Terminal : `mkdir routes app views public`
- ### Run on Terminal : `mkdir app/config app/middlewares app/controllers app/models app/utility`
- ### Run on Terminal : `touch .gitignore index.js routes/api.js app/config/config.js`
### All terminal commands:
```bash
npm init --y
npm i express cookie-parser cors express-rate-limit helmet hpp jsonwebtoken mongoose nodemailer nodemon
mkdir routes app
mkdir app/config app/middlewares app/controllers app/models app/utility
touch .gitignore index.js routes/api.js app/config/config.js
```

### Akhon index.js file ready kore nibo:
```javascript
//index.js
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
```
```javascript
//ata o use korte paro index.js er jonno:
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import router from "./routes/api.js"
import {MONGODB_CONNECTION,PORT,MAX_JSON_SIZE,URL_ENCODED,WEB_CACHE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME} from "./app/config/config.js"
import fileUpload from 'express-fileupload'

const app = express();

// Global Application Middleware
app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp())
app.use(helmet())
app.use(cookieParser())

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));



// Rate Limiter
const limiter=rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter)


// Web Caching
app.set('etag',WEB_CACHE)



// MongoDB connection
mongoose.connect(MONGODB_CONNECTION,{autoIndex:true}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log("Error connecting to MongoDB");
})


// Set API Routes
app.use("/api",router)

// Set Application Storage
app.use(express.static('storage'))

// Run Your Express Back End Project

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})

```
```javascript
//config/config.js
export const MONGODB_CONNECTION="mongodb+srv://mrrabbil:mernx123@cluster0.rtpbcy6.mongodb.net/app_todo?retryWrites=true&w=majority";

export const JWT_SECRET = "5EC7CEFA1BE7C9354A639369A2AA8";
export const JWT_EXPIRATION_TIME = 60*60*24*30;

export const EMAIL_HOST = "smtp.titan.email";
export const EMAIL_PORT = "465";
export const EMAIL_USER = "support@laravelpoint.com";
export const EMAIL_PASSWORD = "Rup77_4827";
export const MAIL_ENCRYPTION="ssl"


export const MAX_JSON_SIZE = "50mb";
export const URL_ENCODED = true;


export const REQUEST_LIMIT_TIME = 15 * 60 * 1000; // 15 Min
export const REQUEST_LIMIT_NUMBER = 3000; // Per 15 Min 3000 Request Allowed


export const WEB_CACHE=false;
export const PORT=5050

```

