import ApplicantModel from "./applicant.model.js";

export default class JobModel{
    constructor(id,category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings,jobPostedOn,jobPostedBy,applicants){
        this._id=id,
        this.category=category,
        this.designation = designation,
        this.location=location,
        this.companyName=companyName,
        this.salary=[salaryFrom,salaryTo],
        this.applyBy=applyBy,
        this.skillsRequired= typeof skillsRequired === 'string' ? skillsRequired.split(',') : skillsRequired,
        this.openings=openings,
        this.jobPostedOn=jobPostedOn,
        this.jobPostedBy=jobPostedBy,
        this.applicants=applicants
    }

    //All Jobs
    static getJobsCount(){
        return jobs.length;
    }
    static getAllJobs(pageIndex){
        const result = jobs.filter((value,index)=>{
            return (index>=((pageIndex-1)*8) && index<(pageIndex*8));
        })

        return result;
    }

    //Specific Job
    static getSpecificJob(id){
        return jobs.find(j=>j._id==id);
    }

    //Recruiter Jobs
    static getRecruiterJobsCount(email){
        const result = jobs.filter(job=>job.jobPostedBy == email);
        return result.length;
    }
    static getRecruiterJobs(email,pageIndex){
        var result =  jobs.filter(job=>job.jobPostedBy == email);
        result = result.filter((value,index)=>{
            return (index>=((pageIndex-1)*8) && index<(pageIndex*8));
        })
        return result;
    }

    //Seached Jobs
    static getSearchedJobsCount(searchedText){
        const searchedJobs = jobs.filter(j=>j.category.toLowerCase()==searchedText || 
                                            j.designation.toLowerCase() == searchedText || 
                                            j.location.toLowerCase() == searchedText || 
                                            j.companyName.toLowerCase() == searchedText || 
                                            j.skillsRequired.some(skill => skill.toLowerCase().includes(searchedText)));

        return searchedJobs.length;
    }
    static getSearchedJobs(searchedText,pageIndex){
        searchedText = searchedText.toLowerCase();
        const searchedJobs = jobs.filter(j=>j.category.toLowerCase()==searchedText || 
                                            j.designation.toLowerCase() == searchedText || 
                                            j.location.toLowerCase() == searchedText || 
                                            j.companyName.toLowerCase() == searchedText || 
                                            j.skillsRequired.some(skill => skill.toLowerCase().includes(searchedText)));
        const result = searchedJobs.filter((value,index)=>{
            return (index>=((pageIndex-1)*8) && index<(pageIndex*8));
        })
        return result;
    }

    //Create Job
    static createJob(category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings,jobPostedOn,jobPostedBy){
        const newJob = new JobModel(jobs.length+1,category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings,jobPostedOn,jobPostedBy,[]);
        jobs.push(newJob);
        return newJob;
    }

    //Update Job
    static updateJob(id,category,designation,location,companyName,salaryFrom,salaryTo,applyBy,skillsRequired,openings){
        const index = jobs.findIndex(j=>j._id==id);
        if(index != -1){
            jobs[index].category = category;
            jobs[index].designation = designation;
            jobs[index].location = location;
            jobs[index].companyName = companyName;
            jobs[index].salary = [salaryFrom,salaryTo];
            jobs[index].applyBy = applyBy;
            jobs[index].skillsRequired = skillsRequired;
            jobs[index].openings = openings;
        }
        return jobs[index];
    }

    //Delete Job
    static deleteJob(id){
        const index = jobs.findIndex(j=>j._id==id);
        if(index != -1){
            jobs.splice(index,1);
        }
    }

    //Add new Applicant
    static addApplicant(jobId,name,email,contact,resume){
        const newApplicant =new ApplicantModel(jobs.find(j=>j._id==jobId).applicants.length+1,name,email,contact,resume);
        jobs.find(j=>j._id==jobId).applicants.push(newApplicant);
        return newApplicant;
    }

    //Retrieve All Applicant
    static getApplicants(id){
        const result =  jobs.find(j=>j._id==id).applicants;
        console.log(result);
        return result;
    }

}

var jobs=[];

jobs.push(new JobModel( 1,
                        "Tech",
                        "SDE",
                        "Banglore",
                        "Coding Ninjas",
                        15000,
                        30000,
                        "02/07/2024",
                        ["HTML","CSS","JS","C++","Problem Solving","REST","AWS","Express","MongoDB"],
                        10,
                        "10/06/2024",
                        "abc@gmail.com",
                        []));

jobs.push(new JobModel( 2,
                        "Tech",
                        "Angular Developer",
                        "Gurgaon",
                        "Google",
                        1000000,
                        1200000,
                        "15/04/2024",
                        ["C++","Problem Solving"],
                        5,
                        "30/03/2024",
                        "abc@gmail.com",
                        []));
                        
jobs.push(new JobModel( 3,
                        "Tech",
                        "Web Developer",
                        "Pune",
                        "Microsoft",
                        1200000,
                        1500000,
                        "08/05/2024",
                        ["HTML","CSS","JS","REST","AWS","Express","MongoDB"],
                        8,
                        "01/05/2024",
                        "sagaryugal472@gmail.com",
                        []))                            
                        jobs.push(new JobModel( 1,
                            "Tech",
                            "SDE",
                            "Banglore",
                            "Coding Ninjas",
                            15000,
                            30000,
                            "02/07/2024",
                            ["HTML","CSS","JS","C++","Problem Solving","REST","AWS","Express","MongoDB"],
                            10,
                            "10/06/2024",
                            "abc@gmail.com",
                            []));
    
    jobs.push(new JobModel( 4,
                            "Tech",
                            "Angular Developer",
                            "Gurgaon",
                            "Google",
                            1000000,
                            1200000,
                            "15/04/2024",
                            ["C++","Problem Solving"],
                            5,
                            "30/03/2024",
                            "abc@gmail.com",
                            []));