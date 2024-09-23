import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

// Initialize Prisma Client
const prisma = new PrismaClient();

export const submitFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone, feedback } = req.body;

        // Basic validation
        if (!name || !email || !phone || !feedback) {
            return res.status(400).json({
                status: false,
                message: "All fields are required: name, email, phone, feedback.",
            });
        }

        if (phone.length !== 10) {
            return res.status(400).json({
                status: false,
                message: "Phone number must be exactly 10 digits.",
            });
        }

        // Insert the feedback into the database
        const newFeedback = await prisma.site_feedback.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                feedback: feedback.trim(),
            },
        });

        return res.status(201).json({
            status: true,
            message: "Feedback submitted successfully.",
            data: newFeedback,
        });
    } catch (err) {
        console.error("Error submitting feedback:", err);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};
