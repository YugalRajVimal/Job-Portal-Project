import JobModel from "../model/job.model.js";
import UserModel from "../model/user.model.js";

export default class HomeController{

    // Rendering Home page
    renderHome(req,res){
        res.render('home',{
            userName:req.session.userName,
            lastVisit:new Date(req.session.lastVisit).toLocaleString(),
            errorMessage:null
        })
    }

    // Rendering SignIn page
    getSignIn(req,res){
        if(req.session.userName){
            res.render('jobs',{
                jobsOf:"All",
                jobs:JobModel.getAllJobs(1),
                jobsCount:JobModel.getJobsCount,
                userName:req.session.userName,
                userEmail:req.session.userEmail,
                lastVisit:new Date(req.session.lastVisit).toLocaleString(),
                errorMessage:('SignOut First')
            });
        }
        res.render('signin',{
            errorMessage:null
        });
    }

    // Validating and SigningIn Recruiter 
    postSignIn(req,res){
        const {email,password} = req.body;
        const user = UserModel.validateUser(email,password);
        if(user){
            //Storing email and username in session
            req.session.userEmail=email;
            req.session.userName = user.name;
            console.log("User Verified");
            return res.redirect('jobs/jobpage/1')
        }
        console.log("Invalid Credentials");
        res.render('signin',{
            errorMessage:null
        });
    }

    // Rendering SignUp page
    getSignUp(req,res){
        if(req.session.userName){
            return res.redirect('jobs');
        }
        res.render('signup',{
            errorMessage:null
        });
    }

    // Creating new Recruiter Account (Signing Up)
    postSignUp(req,res){
        const {name,email,password} = req.body;
        UserModel.addUser(name,email,password);
        res.render('signin',{
            errorMessage:null
        });
    }

    //LoggingOut Recruiter
    logOut(req,res){
        res.locals.userEmail = undefined;
        res.locals.userName = undefined;
        req.session.destroy((err)=>{
            if(err){
                console.log("Error in destroying sessions" , err);
            }
            else{
                res.redirect('/signin');
            }
        });
    }
}