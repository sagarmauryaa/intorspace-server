import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define an extended Request interface to include userId
interface AuthenticatedRequest extends Request {
	userId?: string;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
	try {
		const jwtCookie = req.cookies.authToken; // Directly access the cookie

		const token = jwtCookie as string;
		if (!token) return res.status(401).send("You are not authenticated!");

		jwt.verify(token, process.env.JWT_KEY as string, (err, payload) => {
			if (err) return res.status(403).send("Token is not valid!");
			const jwtPayload = payload as JwtPayload;
			req.userId = jwtPayload?.userId; // Extract userId from the JWT payload
			next();
		});
	} catch (error) {
		return res.status(400).send("Invalid token or cookie.");
	}
};
