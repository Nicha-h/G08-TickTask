import type { Context } from 'hono';
import { z } from 'zod';
import { createUserInDb, fetchProfile, updateProfile } from '../models/User.model.js';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../database/db.js';
import type { User } from '../types/index.js';
import type { RowDataPacket } from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();


const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
  });
  
export async function createUserController(c: Context) {
    const body = await c.req.json();
    const parsed = userSchema.safeParse(body);
  
    if (!parsed.success) {
      return c.json({ error: parsed.error.format() }, 400);
    }
  
    const { email, password } = parsed.data;
  
    try {
      const insertId = await createUserInDb(email, password);
  
      const token = jwt.sign(
        { id: insertId, email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      return c.json({
        message: 'User created successfully',
        token,
        user: {
          id: insertId,
          email,
        },
      });
    } catch (err) {
      console.error(err);
      return c.json({ error: 'Something went wrong' }, 500);
    }
}

export async function loginUserController(c: Context) {
    const { email, password } = await c.req.json();
  
    const [rows] = await db.query<User[] & RowDataPacket[]>(
      'SELECT * FROM user WHERE User_Email = ?',
      [email]
    );
  
    if (rows.length === 0) {
      return c.json({ message: 'Invalid credentials' }, 401);
    }
  
    const user = rows[0];
  
    const match = await bcrypt.compare(password, user.User_Password);
    if (!match) {
      return c.json({ message: 'Invalid credentials' }, 401);
    } 
  
    const token = jwt.sign(
      { id: user.UserID, email: user.User_Email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
  
    return c.json({
      message: 'Login successful',
      token,
      user: {
        id: user.UserID,
        name: user.User_Name,
        email: user.User_Email,
      },
    });
}

export async function fetchProfileController(c: Context) {
    try {
      const user = c.get('user'); 
      const profile = await fetchProfile(user.id);
      return c.json(profile);

    } catch (err) {
      console.error(err);
      return c.json({ error: 'Failed to fetch profile' }, 500);
    }
}

export async function updateProfileController(c: Context) {
  try {
    const user = c.get('user');
    const body = await c.req.json();

    await updateProfile(user.id, {
      name: body.name,
      iconType: body.iconType,
      iconPath: body.iconPath,
    });

    return c.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to update profile' }, 500);
  }
}



