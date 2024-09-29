import { Router } from "express";
import authRoutes from "./AuthRoutes.js";
import faqRoutes from "./FaqRoutes.js";
import legalRoutes from "./LegalPagesRoutes.js";
import categoryRoutes from "./CategoryRoutes.js";
import subCategoryRoutes from "./SubCategoryRoutes.js";
import subsubCategoryRoutes from "./SubSubCategoryRoutes.js";

const adminRoutes = Router();

adminRoutes.use("/api/auth", authRoutes);
adminRoutes.use("/api/", faqRoutes);
adminRoutes.use("/api/", categoryRoutes);
adminRoutes.use("/api/", subCategoryRoutes);
adminRoutes.use("/api/", subsubCategoryRoutes);
adminRoutes.use("/api/", legalRoutes);

export default adminRoutes;
