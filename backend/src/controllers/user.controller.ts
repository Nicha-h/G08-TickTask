import type { Context } from "hono";
import { fetchProfile, updateProfile } from "../models/User.model.js";
import cloudinary from "../utils/Cloudinary.js";

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
