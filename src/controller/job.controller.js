import JobModel from "../model/job.model.js";

export default class JobController{

//Retrieving All jobs according to page no.
    getAllJobs(req,res){
        const page = req.params.page;
        res.render('jobs',{
            jobsOf:"All",
            jobs:JobModel.getAllJobs(page),
            jobsCount:JobModel.getJobsCount(),
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            lastVisit:new Date(req.session.lastVisit).toLocaleString(),
            errorMessage:null
        });
    }

//Retrieving specific job
    getSpecificJob(req,res){
        const id=req.params.id;     
        console.log(JobModel.getSpecificJob(id));
        res.render('job',{
            job:JobModel.getSpecificJob(id),
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            errorMessage:null,
            lastVisit:new Date(req.session.lastVisit).toLocaleString()
        })
    }

//Retrieving jobs of specific recruiter according to page no.
    getRecruiterJobs(req,res){
        const {email,page} = req.params;
        const recruiterJobs = JobModel.getRecruiterJobs(email,page);
        const recruiterJobsCount = JobModel.getRecruiterJobsCount(email);

        res.render('jobs',{
            jobsOf:"Recruiter",
            jobs:recruiterJobs,
            jobsCount:recruiterJobsCount,
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            lastVisit:new Date(req.session.lastVisit).toLocaleString(),
            errorMessage:null
        });
    }

// Rendering Post Job page
    getPostJob(req,res){
        res.render('postjob',{
            userName:req.session.userName,
            errorMessage:null,
            lastVisit:new Date(req.session.lastVisit).toLocaleString()
        })
    }

//Creating new job
    createJob(req,res){
        const {category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings} = req.body;
        console.log(skillsRequired);
        const jobPostedBy = req.session.userEmail;
        const jobPostedOn = new Date();
        JobModel.createJob(category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings,jobPostedOn,jobPostedBy);
        res.redirect('jobs/jobpage/1');
    }

// Rendering UpdateJob page 
    getUpdateJob(req,res){
        const id=req.params.id;   
        res.render('updatejob',{
            job:JobModel.getSpecificJob(id),
            userName:req.session.userName,
            errorMessage:null,
            lastVisit:new Date(req.session.lastVisit).toLocaleString()
        })
    }

// Updating existing Job
    postUpdateJob(req,res){
        const id=req.params.id;   
        const {category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings} = req.body;

        JobModel.updateJob(id,category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings);

        res.render('job',{
            job:JobModel.getSpecificJob(id),
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            lastVisit:new Date(req.session.lastVisit).toLocaleString()
        })
    }

// Deleting Job 
    DeleteJob(req,res){
        const id = req.params.id;
        JobModel.deleteJob(id);
        res.render('jobs',{
            jobsOf:"All",
            jobs:JobModel.getAllJobs(1),
            jobsCount:JobModel.getJobsCount,
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            lastVisit:new Date(req.session.lastVisit).toLocaleString(),
            errorMessage:null
        });
    }
}