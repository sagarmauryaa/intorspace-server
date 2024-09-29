import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { renameSync, unlinkSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// ES module alternative for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AddSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    try {
        const { name, cat_id }: { name: string; cat_id: number } = req.body;

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ status: false, message: "Please upload Category Image." });
        }

        // Handle the file upload, renaming, and storing the path
        const originalFileName = req.file.originalname?.replace(/\s+/g, "_");
        const date = Date.now();
        const fileName = "uploads/sub-category/" + date + originalFileName;
        renameSync(req.file.path, fileName);

        // Create the new category
        await prisma.subCategory.create({
            data: {
                name,
                cat_id: Number(cat_id),
                image: fileName,
            },
        });

        return res.status(201).json({
            status: true,
            message: 'Sub Category created successfully.',
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error: " + err,
        });
    } finally {
        await prisma.$disconnect();
    }
};


export const FetchAllSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();

        const categories = await prisma.subCategory.findMany();

        return res.status(200).json({
            status: true,
            message: 'Sub Categories fetched successfully!',
            data: categories,
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const FetchAllSubCategoryOptionById = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    try {
        const { id } = req.params;
        const categories = await prisma.subCategory.findMany({
            where: { cat_id: Number(id) }, // Ensure the ID is a number
        });

        const formattedCategories = categories.map(category => ({
            value: String(category.id),  // Assuming 'id' is the value
            label: category.name, // Assuming 'name' is the label
        }));

        return res.status(200).json({
            status: true,
            message: 'Categories fetched successfully!',
            data: formattedCategories, // Return the transformed array
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error" + err,
        });
    } finally {
        await prisma.$disconnect();
    }
};

export const FetchSubCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const prisma = new PrismaClient();
    try {
        const { id } = req.params; // Get the ID from the request parameters

        const cat = await prisma.subCategory.findUnique({
            where: { id: Number(id) }, // Ensure the ID is a number
        });

        if (!cat) {
            return res.status(404).json({ status: false, message: "Sub Category not found." });
        }

        return res.status(200).json({
            status: true,
            message: 'Category fetched successfully!',
            data: { name: cat.name, cat_id: String(cat.cat_id), image: cat.image },
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error" + err,
        });
    } finally {
        await prisma.$disconnect();
    }
};

export const UpdateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { name }: { name: string } = req.body;
        const { id } = req.params;
        console.log(req.file);


        // Ensure ID is provided
        if (!name || !id) {
            return res.status(400).json({ status: false, message: "ID, answer, or question is required." });
        }

        const category = await prisma.subCategory.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res.status(404).json({
                status: false,
                message: "category not found"
            });
        }
        const updateData: { name?: string; image?: string; } = {
            name,
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
            const fileName = "uploads/category/" + date + originalFileName;
            renameSync(req.file.path, fileName);
            updateData.image = fileName;
        }
        await prisma.subCategory.update({
            where: { id: Number(id) },
            data: updateData
        });

        // const updatedFaq = await prisma.subCategory.update({
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

export const DeleteSubCatgeory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { id } = req.params; // Extract ID from URL parameters

        // Ensure ID is provided
        if (!id) {
            return res.status(400).json({ status: false, message: "ID is required." });
        }
        const category = await prisma.subCategory.findUnique({
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
        await prisma.subCategory.delete({
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