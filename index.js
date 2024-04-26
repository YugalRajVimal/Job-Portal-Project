import dotenv from "dotenv";
dotenv.config();


import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import Routes from './src/routes/routes.js';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from "express-session";

const app = express();

app.use(cookieParser());

app.use(session({
    secret: 'abcabc',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:false}
}))


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.use(express.static('assets'));

app.set('view engine','ejs');
app.set('views',path.join(path.resolve(),'src','views'));
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use('/',Routes);

app.listen(8080,()=>{
    console.log("Server is running on port : ", 8080);
});