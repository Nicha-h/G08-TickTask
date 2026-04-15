import type { Context } from "hono";
import { PrismaClient } from "../generated/prisma/index.js";
import { z } from "zod";
import {
  createUserInDb,
  fetchProfile,
  updateProfile,
} from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import cloudinary from "../utils/Cloudinary.js";
import { FRONTEND_URL } from "../utils/env.js";
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
    return c.json({ error: parsed.error.format() }, 400);
  }

  const { email, password } = parsed.data;

  try {
    const insertId = await createUserInDb(email, password);

    const token = jwt.sign(
      { id: insertId, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return c.json({
      message: "User created successfully",
      token,
      user: {
        id: insertId,
        email,
      },
    });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return c.json({ error: "Email already exists" }, 409);
    }
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
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
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const match = await bcrypt.compare(password, user.User_Password);
  if (!match) {
    return c.json({ message: "Invalid credentials" }, 401);
  }

  const token = jwt.sign(
    { id: user.UserID, email: user.User_Email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  return c.json({
    message: "Login successful",
    token,
    user: {
      id: user.UserID,
      email: user.User_Email,
    },
  });
}

export async function fetchProfileController(c: Context) {
  try {
    const user = c.get("user");
    const profile = await fetchProfile(user.id);
    return c.json(profile);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
}

export async function updateProfileController(c: Context) {
  try {
    const user = c.get("user");
    const body = await c.req.json();

    await updateProfile(user.id, {
      name: body.name,
      iconType: body.iconType,
      iconPath: body.iconPath,
    });

    return c.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to update profile" }, 500);
  }
}

export async function uploadProfilePicController(c: Context) {
  const body = await c.req.parseBody();
  const file = body.image as File;

  if (!file) {
    return c.json({ error: "No file uploaded" }, 400);
  }
  const MAX_SIZE = 20 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return c.json({ error: "File too large. Max size is 20MB." }, 400);
  }

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "ticktask/profiles",
      transformation: [{ width: 200, height: 200, crop: "fill" }],
    });

    return c.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Failed to upload image" }, 500);
  }
}

export async function checkEmailController(c: Context) {
  try {
    const { email } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { User_Email: email },
    });

    if (!user) {
      return c.json({ exists: false });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    await prisma.user.update({
      where: { UserID: user.UserID },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"TickTask" <no-reply@ticktask.com>',
      to: email,
      subject: "Password Reset Request",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #F4F7FF; -webkit-font-smoothing: antialiased;">
  <div style="font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E0E7FF;">
    
    <div style="padding: 30px; text-align: center;">
       <h1 style="font-family: 'Fredoka One', 'Comic Sans MS', cursive; color: #95B1EE; margin: 0; font-size: 32px;">TickTask</h1>
    </div>

    <div style="padding: 0 40px 40px 40px; text-align: center;">
      <h2 style="font-family: 'Fredoka One', 'Arial Black', sans-serif; color: #3C4045; font-size: 24px; margin-bottom: 15px; font-weight: normal;">
        Forgot your password?
      </h2>
      
      <p style="color: #3C4045; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        No worries! It happens to the best of us. <br>
        Click the button below to set up a new one.
      </p>

      <div style="margin-bottom: 30px;">
        <a href="${resetLink}" 
           style="background-color: #95B1EE; color: #ffffff; padding: 16px 35px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; display: inline-block;">
           Reset Password
        </a>
      </div>

      <div style="padding: 15px; background-color: #FFFDF5; border-radius: 12px; border: 1px solid #E7F1A8;">
        <p style="font-size: 13px; color: #3C4045; margin: 0;">
          <strong>Note:</strong> This link expires in 15 minutes. <br>
          If you didn't ask for this, you can safely ignore this email.
        </p>
      </div>
    </div>

    <div style="padding: 25px; background-color: #F9FAFB; text-align: center; border-top: 1px solid #EEEEEE;">
      <p style="font-size: 11px; color: #A7A7A7; margin: 0 0 10px 0; line-height: 1.4;">
        If the button above doesn't work, copy and paste this link:<br>
        <span style="color: #95B1EE; word-break: break-all;">${resetLink}</span>
      </p>
      <p style="font-family: 'Fredoka One', cursive; font-size: 14px; color: #95B1EE; margin: 0;">
        TickTask
      </p>
    </div>
  </div>
</body>
</html>
`,
    });

    return c.json({ exists: true, message: "Reset email sent" });
  } catch (error) {
    console.error("Server error in checkEmailController:", error);
    return c.json({ exists: false, error: "Internal server error" }, 500);
  }
}

export async function resetPasswordController(c: Context) {
  try {
    const { token, newPassword } = await c.req.json();

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return c.json({ error: "Invalid or expired token" }, 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { UserID: user.UserID },
      data: {
        User_Password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return c.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Server error in resetPasswordController:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
}
