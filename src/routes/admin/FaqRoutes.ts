import { Router } from "express";
import { CreateFaq, DeleteFaq, FetchAllFaq, FetchFaqById, UpdateFaq } from "../../controllers/admin/FaqControllers.js";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";

const faqRoutes = Router();
faqRoutes.post("/faq/create", verifyToken, CreateFaq);
faqRoutes.get("/faqs", verifyToken, FetchAllFaq);
faqRoutes.put("/faq/update/:id", verifyToken, UpdateFaq);
faqRoutes.get("/faq/:id", verifyToken, FetchFaqById);
faqRoutes.delete("/faq/delete/:id", verifyToken, DeleteFaq);

export default faqRoutes;