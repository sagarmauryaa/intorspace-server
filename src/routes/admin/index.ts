import { Router } from "express";
import authRoutes from "./AuthRoutes.js";
import faqRoutes from "./FaqRoutes.js";
import legalRoutes from "./LegalPagesRoutes.js";

const adminRoutes = Router();

adminRoutes.use("/api/auth", authRoutes);
adminRoutes.use("/api/", faqRoutes);
adminRoutes.use("/api/", legalRoutes);

export default adminRoutes;
