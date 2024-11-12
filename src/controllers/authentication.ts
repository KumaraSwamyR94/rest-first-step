import { createUser, getUserByEmail } from 'db/users';
import { Request, Response, RequestHandler } from 'express';
import { authentication, random } from 'helpers';

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            res.status(400).json({ message: 'Email, password, and username are required.' });
            return;
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            res.status(400).json({ message: 'User already exists.' });
            return;
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        res.status(201).json(user);
    } catch (error) {
        console.error('Error in register controller:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
