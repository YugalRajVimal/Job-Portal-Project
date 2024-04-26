import express from 'express';
import HomeController from '../controller/home.controller.js';
// import { setLastVisit } from '../middlewares/lastvisit.middleware.js';
import { validateSignInRequest, validateUserRequest } from '../middlewares/validation.middleware.js';

const homeRouter = express.Router();

const homeController = new HomeController();

//Render Home page
homeRouter.get('/',(req,res)=>{
    homeController.renderHome(req,res);
})

//SignIn
homeRouter.post('/signin',validateSignInRequest,(req,res)=>{
    homeController.postSignIn(req,res);
})

homeRouter.get('/signin',(req,res)=>{
    homeController.getSignIn(req,res);
})

//SignUp
homeRouter.get('/signup',(req,res)=>{
    homeController.getSignUp(req,res);
})

homeRouter.post('/signup',validateUserRequest,(req,res)=>{
    homeController.postSignUp(req,res);
})

//LogOut
homeRouter.get('/logout',(req,res)=>{
    homeController.logOut(req,res);
});

export default homeRouter;