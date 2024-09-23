import express from "express";
import { submitFeedback } from "../../controllers/site/feedbackControllers.js";

const feedbackRoute = express.Router();

// POST route for submitting feedback
feedbackRoute.post("/feedback", submitFeedback);

export default feedbackRoute;
