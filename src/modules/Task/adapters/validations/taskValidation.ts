import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { error_400 } from '../../../../constants/messages';

export const validateTask = [
    body('title').isString(),
    body('description').isString(),
    body('completed').isBoolean(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(error_400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
