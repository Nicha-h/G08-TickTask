import type { Context } from 'hono';
import { PrismaClient } from '../../generated/prisma/index.js';
import { z } from 'zod';
import { createUserInDb, fetchProfile, updateProfile } from '../models/User.model.js';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import cloudinary from '../../config/Cloudinary.js';
import { successResponse, errorResponse } from '../../utils/response.js';
dotenv.config();

const prisma = new PrismaClient();
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
  });
  
export async function createUserController(c: Context) {
    const body = await c.req.json();
    const parsed = userSchema.safeParse(body);
  
    if (!parsed.success) {
      return errorResponse(c, 'Validation failed', 400);
    }
  
    const { email, password } = parsed.data;
  
    try {
      const insertId = await createUserInDb(email, password);
  
      const token = jwt.sign(
        { id: insertId, email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      return successResponse(c, {
        token,
        user: {
          id: insertId,
          email,
        },
      }, 201);
    } catch (err) {
      console.error(err);
      return errorResponse(c, 'Something went wrong', 500);
    }
}

export async function loginUserController(c: Context) {
  const { email, password } = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      User_Email: email,
    },
  });

  if (!user) {
    return errorResponse(c, 'Invalid credentials', 401);
  }

  const match = await bcrypt.compare(password, user.User_Password);
  if (!match) {
    return errorResponse(c, 'Invalid credentials', 401);
  }

  const token = jwt.sign(
    { id: user.UserID, email: user.User_Email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  return successResponse(c, {
    message: 'Login successful',
    token,
    user: {
      id: user.UserID,
      email: user.User_Email,
    },
  });
}

export async function fetchProfileController(c: Context) {
  try {
    const user = c.get('user'); 
    const profile = await fetchProfile(user.id);
    return successResponse(c, profile);

    } catch (err) {
      console.error(err);
      return errorResponse(c, 'Failed to fetch profile', 500);
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

    return successResponse(c, { message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return errorResponse(c, 'Failed to update profile', 500);
  }
}

export async function uploadProfilePicController(c: Context) {
  const body = await c.req.parseBody(); 
  const file = body.image as File;

  if (!file) {
    return errorResponse(c, 'No file uploaded', 400);
  }
  const MAX_SIZE = 20 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return errorResponse(c, 'File too large. Max size is 20MB.', 400);
  }

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const dataUri = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'ticktask/profiles',
      transformation: [{ width: 200, height: 200, crop: 'fill' }],
    });

    return successResponse(c, { imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    return errorResponse(c, 'Failed to upload image', 500);
  }
}

export async function checkEmailController(c: Context) {
  try {
    const { email } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { User_Email: email },
    });

    if (!user) {
      return successResponse(c, { exists: false });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    await prisma.user.update({
      where: { UserID: user.UserID },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"TickTask" <no-reply@ticktask.com>',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    return successResponse(c, { exists: true, message: 'Reset email sent' });

  } catch (error) {
    console.error('Server error in checkEmailController:', error);
    return errorResponse(c, 'Internal server error', 500);
  }
}
 

export async function resetPasswordController(c:Context) {
  try {
    const { token, newPassword } = await c.req.json();
    

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return errorResponse(c, 'Invalid or expired token', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { UserID: user.UserID },
      data: {
        User_Password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return successResponse(c, { success: true, message: 'Password reset successful' });
    
  } catch (error) {
    console.error('Server error in resetPasswordController:', error);
    return errorResponse(c, 'Internal server error', 500);
  }
}