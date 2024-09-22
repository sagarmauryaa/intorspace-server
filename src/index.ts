import express, { Application, Response, Request } from "express";
import "dotenv/config";
import cors from "cors";
import * as path from "path";
import { fileURLToPath } from "url";
// *Routes
import authRoutes from "./routes/AuthRoutes.js";
import faqRoutes from "./routes/FaqRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 7000;
const app: Application = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", async (req: Request, res: Response) => {
    return res.render("welcome")
});

app.use("/api/auth", authRoutes);
app.use("/api/", faqRoutes);


app.listen(PORT, () => console.log(`Server is running  on PORT ${PORT}`))