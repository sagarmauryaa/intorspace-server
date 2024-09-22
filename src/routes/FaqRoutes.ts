import { Router } from "express";
import { CreateFaq, FetchAllFaq, FetchFaqById, UpdateFaq } from "../controllers/FaqControllers.js";

const faqRoutes = Router();
faqRoutes.post("/faq/create", CreateFaq);
faqRoutes.get("/faqs", FetchAllFaq);
faqRoutes.put("/faq/update/:id", UpdateFaq);
faqRoutes.get("/faq/:id", FetchFaqById);

export default faqRoutes;