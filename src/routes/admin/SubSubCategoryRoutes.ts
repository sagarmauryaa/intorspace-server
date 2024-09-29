import { Router } from "express";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";
import multer from "multer";
import { AddSubSubCategory, DeleteSubSubCatgeory, FetchAllSubSubCategory, FetchSubSubCategoryById, UpdateSubSubCategory } from "../../controllers/admin/SubSubCategoryControllers.js";

const subsubCategoryRoutes = Router();
const upload = multer({ dest: "../uploads/sub-category/" });


subsubCategoryRoutes.get("/sub-sub-category", verifyToken, FetchAllSubSubCategory);
subsubCategoryRoutes.post("/sub-sub-category/create", verifyToken, upload.single("subCategoryImage"), AddSubSubCategory);
subsubCategoryRoutes.get("/sub-sub-category/:id", verifyToken, FetchSubSubCategoryById);
subsubCategoryRoutes.put("/sub-sub-category/update/:id", verifyToken, upload.single("subCategoryImage"), UpdateSubSubCategory);
subsubCategoryRoutes.delete("/sub-sub-category/delete/:id", verifyToken, DeleteSubSubCatgeory);

export default subsubCategoryRoutes;