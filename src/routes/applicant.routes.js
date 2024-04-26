import express from 'express'
import { uploadFile } from '../middlewares/fileUpload.middleware.js';
import ApplicantController from '../controller/applicant.controller.js';
import { validateApplicantRequest } from '../middlewares/validation.middleware.js';

const applicantRouter = express.Router();
const applicantController = new ApplicantController();

//Add new Applicant
applicantRouter.post('/apply/:id',uploadFile.single('resumeFile'),validateApplicantRequest,(req,res)=>{
    applicantController.addApplicant(req,res);
});

//Retrieve all applications of a Job
applicantRouter.get('/:id',(req,res)=>{
    applicantController.getApplicants(req,res);
});

//Handling view for Resume PDFs files.
applicantRouter.get('/pdf/:fileName',(req,res,next)=>{
    // Disabled
    // applicantController.viewResume(req,res);
})

export default applicantRouter;