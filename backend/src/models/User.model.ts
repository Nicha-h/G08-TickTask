import { db } from '../database/db.js';
import bcrypt from 'bcrypt';

export async function createUserInDb(email: string, plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, 10);
    const [result] = await db.execute(
        'INSERT INTO user (User_Email, User_Password) VALUES (?, ?)',
        [email, hash]
    );

    const insertId = (result as any).insertId;
    return insertId;
}

