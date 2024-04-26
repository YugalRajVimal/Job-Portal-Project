import express from 'express';
import SearchController from '../controller/search.controller.js';

const searchRouter = express.Router();
const searchController = new SearchController();

//Retrieve Searched Job
searchRouter.post('/:page',(req,res)=>{
    searchController.searchJobs(req,res);
})

searchRouter.get('/:page',(req,res)=>{
    searchController.searchpageJobs(req,res);
})

export default searchRouter;