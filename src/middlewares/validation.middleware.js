import  {body, validationResult} from 'express-validator';
import JobModel from '../model/job.model.js';

export const validateJobRequest = async (req,res,next) =>{

    const rules=[
        body('category')
        .notEmpty()
            .withMessage('Category is required')
        .isIn(['Tech','Non Tech'])
            .withMessage('Category must be either "Tech" or "Non Tech"'),
        body('designation')
        .notEmpty()
            .withMessage('Designation is Required'),
        body('location')
        .notEmpty()
            .withMessage('Location is Required'),
        body('companyName')
        .notEmpty()
            .withMessage('Company Name is Required'),
        body('salaryFrom')
        .notEmpty()
            .withMessage('Salary is Required')
        .isNumeric()
            .withMessage('Salary must be a number'),
        body('salaryTo')
        .optional({ nullable: true })
        .custom((value, { req }) => {
            if (value === '' || value === undefined) {
                // If salaryTo is empty, it's considered valid
                return true;
            }
            if (isNaN(value)) {
                throw new Error('Salary must be a number');
            }
            const salaryFrom = parseFloat(req.body.salaryFrom);
            const salaryTo = parseFloat(value);
            if (salaryTo <= salaryFrom) {
                throw new Error('Salary To must be greater than Salary From');
            }
            return true;
        }),
        body('openings')
        .notEmpty()
            .withMessage('Openings is Required')
        .isNumeric()
            .withMessage('Openings must be a number'),
        body('skillsRequired')
        .notEmpty()
            .withMessage('Skills are Required'),
        body('applyBy')
        .notEmpty()
            .withMessage('Apply By is Required')
        .isDate()
            .withMessage('Apply By must be a Date')
        .custom((value, { req }) => {
            const applyByDate = new Date(value);
            const currentDate = new Date();
            if (applyByDate <= currentDate) {
                throw new Error('Apply By must be a date in the future');
            }
            return true;
        }),
    ];

    await Promise.all(
        rules.map((rule)=>rule.run(req))
    );

    var validationErrors = validationResult(req);
    console.log(validationErrors);

    if(!validationErrors.isEmpty()){
        return res.render('postjob',{
            errorMessage:validationErrors.array()[0].msg,
        })
    }
    next();
}


//Update Job Validator
export const validateUpdateJobRequest = async (req,res,next) =>{

    const rules=[
        body('category')
        .notEmpty()
            .withMessage('Category is required')
        .isIn(['Tech','Non Tech'])
            .withMessage('Category must be either "Tech" or "Non Tech"'),
        body('designation')
        .notEmpty()
            .withMessage('Designation is Required'),
        body('location')
        .notEmpty()
            .withMessage('Location is Required'),
        body('companyName')
        .notEmpty()
            .withMessage('Company Name is Required'),
        body('salaryFrom')
        .notEmpty()
            .withMessage('Salary is Required')
        .isNumeric()
            .withMessage('Salary must be a number'),
        body('salaryTo')
        .optional({ nullable: true })
        .custom((value, { req }) => {
            console.log(value);
            if (value === '' || value === undefined) {
                // If salaryTo is empty, it's considered valid
                return true;
            }
            if (isNaN(value)) {
                throw new Error('Salary must be a number');
            }
            const salaryFrom = parseFloat(req.body.salaryFrom);
            const salaryTo = parseFloat(value);
            if (salaryTo <= salaryFrom) {
                throw new Error('Salary To must be greater than Salary From');
            }
            return true;
        }),
        body('openings')
        .notEmpty()
            .withMessage('Openings is Required')
        .isNumeric()
            .withMessage('Openings must be a number'),
        body('skillsRequired')
        .notEmpty()
            .withMessage('Skills are Required'),
        body('applyBy')
        .notEmpty()
            .withMessage('Apply By is Required')
        .isDate()
            .withMessage('Apply By must be a Date')
        .custom((value, { req }) => {
            const applyByDate = new Date(value);
            const currentDate = new Date();
            if (applyByDate <= currentDate) {
                throw new Error('Apply By must be a date in the future');
            }
            return true;
        }),
    ];

    await Promise.all(
        rules.map((rule)=>rule.run(req))
    );

    var validationErrors = validationResult(req);
    console.log(validationErrors);

    if(!validationErrors.isEmpty()){
        return res.render('updatejob',{
            job:JobModel.getSpecificJob(req.params.id),
            userName:req.session.userName,
            errorMessage:validationErrors.array()[0].msg,
        })
    }
    next();
}

// User(Recruiter) Validator
export const validateUserRequest = async (req,res,next) =>{
    const rules=[
        body('name')
        .notEmpty()
        .withMessage("Name must not be Empty"),
        body('email')
        .notEmpty()
            .withMessage('Email must not be Empty')
        .isEmail()
            .withMessage('Enter valid Email address'),
        body('password')
        .notEmpty()
            .withMessage("Password must not be Empty") 
        .isLength({min:9,max:25})
            .withMessage('Password must be between 8 to 25 characters long')
        .matches(/[0-9]/)
            .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
            .withMessage('Password must contain at least one uppercase letter')
        .matches(/[^a-zA-Z0-9]/)   
            .withMessage('Password must contain at least one special letter')            
    ]

    await Promise.all(
        rules.map((rule)=>rule.run(req))
    )

    const validationErrors = validationResult(req);
    console.log(validationErrors);
    if(!validationErrors.isEmpty()){
        return res.render('signup',{
            errorMessage:validationErrors.array()[0].msg,
        })
    }
    next();
}
// Applicant Validator

export const validateApplicantRequest=async (req, res, next)=>{

    const rules = [
        body('name')
        .notEmpty()
            .withMessage('Name must not be Empty'),
        body('email')
        .notEmpty()
            .withMessage('Email must not be Empty')
        .isEmail()
            .withMessage('Enter valid Email address'),
        body('contact')
        .notEmpty()
            .withMessage('Contact must not be Empty')
            .matches(/^\d{10}$/)
            .withMessage('Invalid contact number'),
        // body('resumeFile')
        // .custom((value,{req})=>{
        //     if(!value || !value.mimetype || value.mimetype !== 'application/pdf'){
        //         throw new Error("Uploaded file must be a PDF");
        //     }
        //     return true;
        // }).withMessage('Uploaded file must be PDF')
    ]

    await Promise.all(
        rules.map((rule)=>rule.run(req))
    )

    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){

        return res.render('job',{
            job:JobModel.getSpecificJob(req.params.id),
            userName:req.session.userName,
            errorMessage:validationErrors.array()[0].msg
        })
    }

    next();
}

// Signin Validator
export const validateSignInRequest = async (req,res,next) =>{
    const rules=[
        body('email')
        .notEmpty()
            .withMessage('Email must not be Empty')
        .isEmail()
            .withMessage('Enter valid Email address'),
        body('password')
        .notEmpty()
            .withMessage("Password must not be Empty")         
    ]

    await Promise.all(
        rules.map((rule)=>rule.run(req))
    )

    const validationErrors = validationResult(req);
    console.log(validationErrors);
    if(!validationErrors.isEmpty()){
        return res.render('signin',{
            errorMessage:validationErrors.array()[0].msg,
        })
    }
    next();
}