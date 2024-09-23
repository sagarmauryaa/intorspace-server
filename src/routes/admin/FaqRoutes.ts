import { Router } from "express";
import { CreateFaq, DeleteFaq, FetchAllFaq, FetchFaqById, UpdateFaq } from "../../controllers/admin/FaqControllers.js";

const faqRoutes = Router();
faqRoutes.post("/faq/create", CreateFaq);
faqRoutes.get("/faqs", FetchAllFaq);
faqRoutes.put("/faq/update/:id", UpdateFaq);
faqRoutes.get("/faq/:id", FetchFaqById);
faqRoutes.delete("/faq/delete/:id", DeleteFaq);

export default faqRoutes;