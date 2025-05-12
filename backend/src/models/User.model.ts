import type { Context } from 'vm';
import { db } from '../database/db.js';
import bcrypt from 'bcrypt';

export async function createUserInDb(email: string, plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, 10);
    const [result] = await db.execute(
        'INSERT INTO user (User_Email, User_Password) VALUES (?, ?)',
        [email, hash]
    );

    const insertId = (result as any).insertId;
    await db.execute(
        `INSERT INTO profile (UserID, Username, User_profile_icon_type, User_profile_icon_path) 
         VALUES (?, ?, ?, ?)`,
        [insertId, email, 'preset', 'default_icon.png']
      );

    return insertId;
}

export async function fetchProfile(userid: number) {
    const [rows] = await db.execute(
      'SELECT * FROM profile WHERE UserID = ?',
      [userid]
    );
    return (rows as any)[0];
  }
  
export async function updateProfile(userid: number, data: {
    name?: string;
    iconType?: string;
    iconPath?: string;
}) {
    const fields = [];
    const values = [];
  
    if (data.name) {
      fields.push('UserName = ?');
      values.push(data.name);
    }
  
    if (data.iconType) {
      fields.push('User_profile_icon_type = ?');
      values.push(data.iconType);
    }
  
    if (data.iconPath) {
      fields.push('User_profile_icon_path = ?');
      values.push(data.iconPath);
    }
  
    if (fields.length === 0) return;
  
    values.push(userid);
  
    await db.execute(
      `UPDATE profile SET ${fields.join(', ')} WHERE UserID = ?`,
      values
    );
}