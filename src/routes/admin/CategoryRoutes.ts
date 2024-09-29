import { Router } from "express";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";
import multer from "multer";
import { AddCategory, DeleteCatgeory, FetchAllCategory, FetchCategoryById, UpdateCategory } from "../../controllers/admin/CategoryControllers.js";

const categoryRoutes = Router();
const upload = multer({ dest: "../uploads/category/" });


categoryRoutes.get("/category", verifyToken, FetchAllCategory);
categoryRoutes.post("/category/create", verifyToken, upload.single("categoryImage"), AddCategory);
categoryRoutes.get("/category/:id", verifyToken, FetchCategoryById);
categoryRoutes.put("/category/update/:id", verifyToken, upload.single("categoryImage"), UpdateCategory);
categoryRoutes.delete("/category/delete/:id", verifyToken, DeleteCatgeory);

export default categoryRoutes;