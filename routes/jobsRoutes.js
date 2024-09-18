
import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createjobController, getAllJobsController } from '../controllers/jobsController.js';

const router = express.Router();

//create-job routes
router.post('/create-job', userAuth, createjobController);

//get-job routes
router.get('/get-job', userAuth, getAllJobsController);

export default router;