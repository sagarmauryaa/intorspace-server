import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Instantiate PrismaClient globally

export const FetchLegalContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({ status: false, message: "Slug is required." });
        }

        const legalPage = await prisma.legal_pages.findUnique({
            where: { slug: String(slug) },
        });

        if (!legalPage) {
            return res.status(404).json({
                status: false,
                message: "Legal page not found.",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Legal page fetched successfully.",
            data: legalPage,
        });
    } catch (err: unknown) {
        console.error(err); // Log error for debugging
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};

export const UpdateLegalPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content }: { title: string; content: string } = req.body;
        const { slug } = req.params;

        if (!slug) {
            return res.status(400).json({ status: false, message: "Slug is required." });
        }

        if (!title && !content) {
            return res.status(400).json({ status: false, message: "Title or content is required." });
        }

        const legalPage = await prisma.legal_pages.findUnique({
            where: { slug: String(slug) },
        });

        if (legalPage) {
            // Update existing legal page
            const updatedLegalPage = await prisma.legal_pages.update({
                where: { id: legalPage.id }, // Use unique `id` for the update
                data: {
                    ...(title && { title }),
                    ...(content && { content }),
                },
            });

            return res.status(200).json({
                status: true,
                message: 'Updated successfully.',
                updatedLegalPage,
            });
        } else {
            // Create a new legal page if not found
            const newLegalPage = await prisma.legal_pages.create({
                data: {
                    slug, // Use the slug provided in the request
                    title: title || '', // Provide an empty string if title is undefined
                    content: content || '', // Provide an empty string if content is undefined
                },
            });

            return res.status(201).json({
                status: true,
                message: 'Created successfully.',
                newLegalPage,
            });
        }
    } catch (err: unknown) {
        console.error(err); // Log error for debugging

        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
