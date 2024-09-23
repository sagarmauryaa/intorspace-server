import { Router } from "express";
import feedbackRoute from "./feedbackRoute.js";

const siteRoutes = Router();

siteRoutes.use("/api/", feedbackRoute);

export default siteRoutes;
