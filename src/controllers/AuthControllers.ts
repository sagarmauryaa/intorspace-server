import { Prisma, PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { renameSync } from "fs";
import { Request, Response, NextFunction } from "express";

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
                return res.status(404).send("User not found");
            }

            const auth = await compare(password, user.password);
            if (!auth) {
                return res.status(400).send("Invalid Password");
            }
            const token = createToken(email, user.id.toString());
            return res.status(200).json({
                message: "Logged in successfully!",
                user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
                token: token
            });
        } else {
            return res.status(400).send("Email and Password Required");
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


export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        if (id) {
            const prisma = new PrismaClient();
            const user = await prisma.admin.findUnique({
                where: { id: id },
            });

            return res.status(200).json({
                user: {
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    phone: user?.phone,
                },
            });
        }
    } catch (err: unknown) {
        res.status(500).send("Internal Server Occurred");
    }
};

export const setUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, name, email, password } = req.body;
        console.log("req.cookies::", req.cookies);

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

            return res.status(200).json({ message: "Profile data updated successfully.", user: { id: result.id, name: result.name, email: result.email, phone: result.phone }, },);
        } else {
            return res.status(400).send("Something error. Please try again!");
        }

    } catch (err: unknown) {
        return res.status(500).send("Internal Server Error");
    }
};

// export const setUserImage = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         if (req.file && req.userId) {
//             const date = Date.now();
//             const fileName = "uploads/profiles/" + date + req.file.originalname;
//             renameSync(req.file.path, fileName);

//             const prisma = new PrismaClient();
//             await prisma.admin.update({
//                 where: { id: req.userId },
//                 data: { profileImage: fileName },
//             });

//             return res.status(200).json({ img: fileName });
//         } else {
//             return res.status(400).send("Image not included or Cookie Error.");
//         }
//     } catch (err: unknown) {
//         console.log(err);
//         res.status(500).send("Internal Server Occurred");
//     }
// };
