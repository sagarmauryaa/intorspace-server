import { Router } from "express";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";
import multer from "multer";
import { AddBrands, DeleteBrands, FetchAllBrands, FetchBrandsById, UpdateBrands } from "../../controllers/admin/BrandsControllers.js";

const brandsRoutes = Router();
const upload = multer({ dest: "../uploads/brands/" });


brandsRoutes.get("/brands", verifyToken, FetchAllBrands);
brandsRoutes.post("/brands/create", verifyToken, upload.single("brandImage"), AddBrands);
brandsRoutes.get("/brands/:id", verifyToken, FetchBrandsById);
brandsRoutes.put("/brands/update/:id", verifyToken, upload.single("brandImage"), UpdateBrands);
brandsRoutes.delete("/brands/delete/:id", verifyToken, DeleteBrands);

export default brandsRoutes;