import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { renameSync, unlinkSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// ES module alternative for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AddBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { name, content }: { name: string, content: string } = req.body;
        console.log(req.file);

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ status: false, message: "Please upload Brand Image." });
        }

        // Handle the file upload, renaming, and storing the path
        const originalFileName = req.file.originalname?.replace(/\s+/g, "_");
        const date = Date.now();
        const fileName = "uploads/brands/" + date + originalFileName;
        renameSync(req.file.path, fileName);


        // Create the new Brand
        await prisma.brands.create({
            data: {
                name,
                content,
                image: fileName,
            },
        });

        return res.status(201).json({
            status: true,
            message: 'Brand created successfully.',
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error: " + err,
        });
    }
};


export const FetchAllBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();

        const categories = await prisma.brands.findMany();

        return res.status(200).json({
            status: true,
            message: 'Categories fetched successfully!',
            data: categories,
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};


export const FetchBrandsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { id } = req.params; // Get the ID from the request parameters

        const cat = await prisma.brands.findUnique({
            where: { id: Number(id) }, // Ensure the ID is a number
        });

        if (!cat) {
            return res.status(404).json({ status: false, message: "Brand not found." });
        }

        return res.status(200).json({
            status: true,
            message: 'Brand fetched successfully!',
            data: { name: cat.name, image: cat.image, content: cat.content },
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error" + err,
        });
    }
};

export const UpdateBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { name, content }: { name: string, content: string } = req.body;
        const { id } = req.params;
        console.log(req.file);


        // Ensure ID is provided
        if (!name || !id) {
            return res.status(400).json({ status: false, message: "ID, answer, or question is required." });
        }

        const category = await prisma.brands.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res.status(404).json({
                status: false,
                message: "category not found"
            });
        }
        const updateData: { name?: string; image?: string; content?: string } = {
            name,
            content,
        };

        if (req.file) {
            const existingImage = category.image;

            if (existingImage) {
                const existingImagePath = path.join(__dirname, "../../../", existingImage);
                if (existsSync(existingImagePath)) {
                    unlinkSync(existingImagePath);
                }
            }

            const originalFileName = req.file.originalname?.replace(/\s+/g, "_");
            const date = Date.now();
            const fileName = "uploads/brands/" + date + originalFileName;
            renameSync(req.file.path, fileName);
            updateData.image = fileName;
        }
        await prisma.brands.update({
            where: { id: Number(id) },
            data: updateData
        });

        // const updatedFaq = await prisma.brands.update({
        //     where: { id: Number(id) },
        //     data: {
        //         name,
        //         image:
        //     },
        // });

        return res.status(200).json({
            status: true,
            message: 'Category data updated successfully.',
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const DeleteBrands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { id } = req.params; // Extract ID from URL parameters

        // Ensure ID is provided
        if (!id) {
            return res.status(400).json({ status: false, message: "ID is required." });
        }

        const category = await prisma.brands.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res.status(404).json({
                status: false,
                message: "category not found"
            });
        }
        const existingImage = category.image;

        if (existingImage) {
            const existingImagePath = path.join(__dirname, "../../../", existingImage);
            if (existsSync(existingImagePath)) {
                unlinkSync(existingImagePath);
            }
        }
        await prisma.brands.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({
            status: true,
            message: 'Category data deleted successfully.',
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};