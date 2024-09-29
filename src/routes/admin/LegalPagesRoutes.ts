import { Router } from "express";
import { FetchLegalContent, UpdateLegalPage } from "../../controllers/admin/LegalControllers.js";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";

const legalRoutes = Router();
legalRoutes.get("/legal/:slug", verifyToken, FetchLegalContent);
legalRoutes.put("/legal/update/:slug", verifyToken, UpdateLegalPage);

export default legalRoutes;