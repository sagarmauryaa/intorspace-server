import express, { Application, Response, Request } from "express";
import "dotenv/config";
import cors from "cors";
import * as path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
// *Routes 
import adminRoutes from "./routes/admin/index.js";
import siteRoutes from "./routes/site/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 7000;
const app: Application = express();

app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Set View engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.get("/", async (req: Request, res: Response) => {
    return res.render("welcome")
});

app.use("/admin", adminRoutes);
app.use("/site", siteRoutes);


app.listen(PORT, () => console.log(`Server is running  on PORT ${PORT}`))