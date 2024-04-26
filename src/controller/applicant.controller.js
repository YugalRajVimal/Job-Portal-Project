import JobModel from "../model/job.model.js";
import { sendMail } from "../middlewares/mailer.middleware.js";
import fs from 'fs'
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the path of the current module file
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module file
const __dirname = dirname(__filename);

export default class ApplicantController{
    // Adding new Applicant 
    addApplicant(req,res){
        const jobId = req.params.id;
        const {name,email,contact} = req.body;
        const resume = req.file?.filename;
        JobModel.addApplicant(jobId,name,email,contact,resume);
        sendMail(email);
        const applicants = JobModel.getApplicants(jobId);
        res.render('job',{
            job:JobModel.getSpecificJob(jobId),
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            lastVisit:new Date(req.session.lastVisit).toLocaleString(),
            errorMessage:null
        })
    }

    // Retrieving all application of a job 
    getApplicants(req,res){
        const applicants = JobModel.getApplicants(req.params.id);
        
        res.render('applicants',{
            applicants:applicants,
            userName:req.session.userName,
            lastVisit:new Date(req.session.lastVisit).toLocaleString()
        });
    }

    // Creating a view of Applicant's Resume
    viewResume(req,res){
        const filePath = path.join(__dirname,'..','..','public','uploads', req.params.fileName);
        const stat = fs.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': stat.size
        });

        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
}