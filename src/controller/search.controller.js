import JobModel from "../model/job.model.js";


export default class SearchController{
    // Searching Jobs 
    searchJobs(req,res){
        const searchText = req.body.searchText;
        req.session.searchedText = searchText;
        const page = req.params.page;
        res.render('jobs',{
            jobsOf:"Searched",
            jobs:JobModel.getSearchedJobs(searchText,page),
            jobsCount:JobModel.getSearchedJobsCount(searchText),
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            lastVisit:new Date(req.session.lastVisit).toLocaleString(),
            errorMessage:null
        });
    }
    searchpageJobs(req,res){
        const {page} = req.params;
        const searchText = req.session.searchedText;
        res.render('jobs',{
            jobsOf:"Searched",
            jobs:JobModel.getSearchedJobs(searchText,page),
            jobsCount:JobModel.getSearchedJobsCount(searchText),
            userName:req.session.userName,
            userEmail:req.session.userEmail,
            lastVisit:new Date(req.session.lastVisit).toLocaleString(),
            errorMessage:null
        });
    }
}

