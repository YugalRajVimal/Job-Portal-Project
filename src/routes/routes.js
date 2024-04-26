import express from 'express';
import homeRouter from './home.routes.js';
import jobsRouter from './job.routes.js';
import searchRouter from './search.routes.js';
import applicantRouter from './applicant.routes.js';


const Routes = express.Router();

Routes.use('/',homeRouter)

Routes.use('/jobs',jobsRouter);

//Applicant Routes
Routes.use('/applicants',applicantRouter);

//Search Job Routes
Routes.use('/search',searchRouter);

// Middleware to handel 404 request
Routes.use((req,res)=>{
    res.status(404).send("API not found.")
})


export default Routes;