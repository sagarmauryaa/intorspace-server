import { Router } from "express";
import {
    getUserInfo,
    login,
    setUserImage,
    setUserInfo,
} from "../../controllers/admin/AuthControllers.js";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "../uploads/profiles/" });

// authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/verify-user", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, setUserInfo);

authRoutes.post(
    "/update-profile/image",
    verifyToken,
    upload.single("profileImage"),
    setUserImage
);

export default authRoutes;