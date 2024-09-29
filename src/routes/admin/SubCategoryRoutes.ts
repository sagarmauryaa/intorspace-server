import { Router } from "express";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";
import multer from "multer";
import { AddSubCategory, DeleteSubCatgeory, FetchAllSubCategoryOptionById, FetchAllSubCategory, FetchSubCategoryById, UpdateSubCategory } from "../../controllers/admin/SubCategoryControllers.js";
const subCategoryRoutes = Router();
const upload = multer({ dest: "../uploads/sub-category/" });


subCategoryRoutes.get("/sub-category", verifyToken, FetchAllSubCategory);
subCategoryRoutes.get("/sub-category/options/:id", verifyToken, FetchAllSubCategoryOptionById);
subCategoryRoutes.post("/sub-category/create", verifyToken, upload.single("subCategoryImage"), AddSubCategory);
subCategoryRoutes.get("/sub-category/:id", verifyToken, FetchSubCategoryById);
subCategoryRoutes.put("/sub-category/update/:id", verifyToken, upload.single("categoryImage"), UpdateSubCategory);
subCategoryRoutes.delete("/sub-category/delete/:id", verifyToken, DeleteSubCatgeory);

export default subCategoryRoutes;