import { Router } from "express";
import { FetchLegalContent, UpdateLegalPage } from "../../controllers/admin/LegalControllers.js";

const legalRoutes = Router();
legalRoutes.get("/legal/:slug", FetchLegalContent);
legalRoutes.put("/legal/update/:slug", UpdateLegalPage);

export default legalRoutes;