import express from 'express';
import JobController from '../controller/job.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import {validateJobRequest, validateUpdateJobRequest } from '../middlewares/validation.middleware.js';

const jobsRouter = express.Router();
const jobController = new JobController();

//Retrieving All jobs according to page no.
jobsRouter.get('/jobpage/:page',(req,res)=>{
    jobController.getAllJobs(req,res);
});

//Retrieving jobs of specific recruiter according to page no.
jobsRouter.get('/recruiter/:email/:page',(req,res)=>{
    jobController.getRecruiterJobs(req,res);
});

// Rendering Post Job page
jobsRouter.get('/postjob',auth,(req,res)=>{
    jobController.getPostJob(req,res);
})

//Retrieving specific job
jobsRouter.get('/:id',(req,res)=>{
    jobController.getSpecificJob(req,res);
});

//Creating new job
jobsRouter.post('/',auth,validateJobRequest,(req,res)=>{
    jobController.createJob(req,res);
})

//Job Update Routes
jobsRouter.get('/update/:id',(req,res)=>{
    jobController.getUpdateJob(req,res);
})
jobsRouter.post('/update/:id',validateUpdateJobRequest,(req,res)=>{
    jobController.postUpdateJob(req,res);
})

//Job Delete Routes
jobsRouter.get('/delete/:id',(req,res)=>{
    jobController.DeleteJob(req,res);
})


export default jobsRouter;