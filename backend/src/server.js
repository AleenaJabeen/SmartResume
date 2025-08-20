
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './models/database.js';



const app = express();
dotenv.config({
    path: './.env' // this is the path of the config file
});


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

connectDB().then(()=>{
app.on("error",(error)=>{
       console.log("Error ",error);
       throw error;
    });
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err)=>{
    console.log("Mongodb connection error",err);
    
});
app.use(express.static('public'));

app.use(cookieParser());
app.use(cors());

import generateRoute from './routes/router.js';
import atsRouter from './routes/ats.route.js'


app.use('/api/v1',generateRoute);
app.use('/api/v1',atsRouter)

