import { Router } from "express";
import {
    getUserInfo,
    login,
    // setUserImage,
    setUserInfo,
    // signup,
} from "../../controllers/admin/AuthControllers.js";
import { verifyToken } from "../../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

// authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/verify-user", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, setUserInfo);

// authRoutes.post(
//     "/set-user-image",
//     verifyToken,
//     upload.single("images"),
//     setUserImage
// );

export default authRoutes;