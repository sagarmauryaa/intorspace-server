import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";


export const CreateFaq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { answer, question }: { answer: string; question: string } = req.body;

        const user = await prisma.site_faqs.create({
            data: {
                answer,
                question
            },
        });
        return res.status(201).json({
            status: true,
            message: 'FAQ data updated successfully.',
        });
    }
    catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const FetchAllFaq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();

        const faqs = await prisma.site_faqs.findMany();

        return res.status(200).json({
            status: true,
            message: 'FAQs fetched successfully!',
            data: faqs,
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const FetchFaqById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { id } = req.params; // Get the ID from the request parameters

        const faq = await prisma.site_faqs.findUnique({
            where: { id: Number(id) }, // Ensure the ID is a number
        });

        if (!faq) {
            return res.status(404).json({ status: false, message: "FAQ not found." });
        }

        return res.status(200).json({
            status: true,
            message: 'FAQ fetched successfully!',
            data: faq,
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const UpdateFaq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { answer, question }: { answer: string; question: string } = req.body;
        const { id } = req.params; // Extract ID from URL parameters

        // Ensure ID is provided
        if (!id || (!answer && !question)) {
            return res.status(400).json({ status: false, message: "ID, answer, or question is required." });
        }

        const updatedFaq = await prisma.site_faqs.update({
            where: { id: Number(id) },
            data: {
                answer,
                question
            },
        });

        return res.status(200).json({
            status: true,
            message: 'FAQ data updated successfully.',
            updatedFaq,
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const DeleteFaq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prisma = new PrismaClient();
        const { id } = req.params; // Extract ID from URL parameters

        // Ensure ID is provided
        if (!id) {
            return res.status(400).json({ status: false, message: "ID is required." });
        }

        const updatedFaq = await prisma.site_faqs.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({
            status: true,
            message: 'FAQ data deleted successfully.',
            updatedFaq,
        });
    } catch (err: unknown) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};