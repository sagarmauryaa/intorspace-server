import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { renameSync, unlinkSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// ES module alternative for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePassword = async (password: string): Promise<string> => {
    const salt = await genSalt();
    return await hash(password, salt);
};

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (email: string, userId: string): string => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY as string, {
        expiresIn: maxAge,
    });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { email, password }: { email: string; password: string } = req.body;

        if (email && password) {
            const user = await prisma.admin.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }

            const auth = await compare(password, user.password);
            if (!auth) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid Password"
                });
            }
            const token = createToken(email, user.id.toString());
            return res.status(200).json({
                status: true,
                message: "Logged in successfully!",
                user: {
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    phone: user?.phone,
                    profileImage: user?.profileImage,
                },
                token: token
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "Email and Password Required"
            });
        }
    } catch (err: unknown) {
        return res.status(500).send("Internal Server Error");
    }
};

// export const signup = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const prisma = new PrismaClient();
//         const { email, password } = req.body;

//         if (email && password) {
//             const user = await prisma.admin.create({
//                 data: {
//                     email,
//                     password: await generatePassword(password),
//                 },
//             });
//             return res.status(201).json({
//                 user: { id: user.id, email: user.email },
//                 jwt: createToken(email, user.id),
//             });
//         } else {
//             return res.status(400).send("Email and Password Required");
//         }
//     } catch (err: unknown) {
//         if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
//             return res.status(400).send("Email Already Registered");
//         }
//         return res.status(500).send("Internal Server Error");
//     }
// };


export const getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const prisma = new PrismaClient();

    try {

        if (req?.userId) { // Now TypeScript recognizes userId
            const user = await prisma.admin.findUnique({
                where: {
                    id: Number(req?.userId),
                },
            });

            return res.status(200).json({
                status: true,
                user: {
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    phone: user?.phone,
                    profileImage: user?.profileImage,
                },
            });
        } else {
            // User ID not provided
            return res.status(400).json({ status: false, message: "User ID is required" });
        }
    } catch (err: unknown) {
        res.status(500).send("Internal Server Occurred");
    }
};

export const setUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, name, email, password } = req.body;
        if (id && email) {
            const prisma = new PrismaClient();
            const user = await prisma.admin.findUnique({
                where: { id },
            });

            if (!user) {
                return res.status(404).send("User not found.");
            }
            const updateData: { name?: string; email?: string; password?: string } = {
                name,
                email,
            };
            if (password) {
                updateData.password = await generatePassword(password);
            }

            const result = await prisma.admin.update({
                where: { id },
                data: updateData,
            });

            return res.status(200).json({
                status: true, message: "Profile data updated successfully.", user: {
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    phone: user?.phone,
                    profileImage: user?.profileImage,
                },
            },);
        } else {
            return res.status(400).json({ status: false, message: "Something error. Please try again!" });
        }

    } catch (err: unknown) {
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

export const setUserImage = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    try {

        if (!req.file || !req.userId) {
            return res.status(400).json({ status: false, message: "Please try again!" });
        }

        const userId = Number(req.userId);
        const user = await prisma.admin.findUnique({
            where: { id: userId },
            select: { profileImage: true },
        });

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }
        const existingImage = user.profileImage;

        if (existingImage) {
            const existingImagePath = path.join(__dirname, "../../../", existingImage);
            if (existsSync(existingImagePath)) {
                unlinkSync(existingImagePath);
            }
        }


        const originalFileName = req.file.originalname?.replace(/\s+/g, "_");
        const date = Date.now();
        const fileName = "uploads/profiles/" + date + originalFileName;
        renameSync(req.file.path, fileName);


        await prisma.admin.update({
            where: { id: userId },
            data: { profileImage: fileName },
        });

        return res.status(200).json({ status: true, message: "Profile data updated successfully.", profileImage: fileName });

    } catch (err: unknown) {
        console.log(err);
        res.status(500).json({ status: false, message: "Internal Server Occurred" });
    }
};
