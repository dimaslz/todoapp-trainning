import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export default (req: Request, res: Response) => {
    res.status(200).json({
        key: "value"
    });
};
