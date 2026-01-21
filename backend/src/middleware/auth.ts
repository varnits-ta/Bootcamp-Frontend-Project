import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUser, verifyPassword } from '../utils/loginUtils';
import { JWT_SECRET } from '../data/auth';

export interface AuthRequest {
    user: {
        username: string;
        role: string;
    };
}

export const loginUser = async (req: any, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = findUser(username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000,
        });

        res.json({
            message: 'Login successful',
            user: { username: user.username, role: user.role },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};