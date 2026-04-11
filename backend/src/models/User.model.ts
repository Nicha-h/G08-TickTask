import { db } from '../index.js'
import bcrypt from 'bcrypt';

export async function createUserInDb(email: string, plainPassword: string) {
  const hash = await bcrypt.hash(plainPassword, 10);
  
  const user = await db.user.create({
    data: {
      User_Email: email,
      User_Password: hash,
      profile: {
        create: {
          Username: email,
          User_profile_icon_type: 'preset',
          User_profile_icon_path: '../../assets/ProfilePics/men1.svg'
        }
      },
      category: {
        create: {
          Category_Name: 'All',
          Category_icon: 'iconAll',
          Category_Color: '#D4B4FF',
        }
      }
    },
    include: {
      profile: true,
      category: true,
    }
  });

  return user.UserID;
}
export async function fetchProfile(userid: number) {
  const profile = await db.profile.findUnique({
    where: {
      UserID: userid
    },
    include: {
      user: {
        select: {
          User_Email: true
        }
      }
    }
  });
  
  return profile;
}
export async function updateProfile(userid: number, data: {
  name?: string;
  iconType?: string;
  iconPath?: string;
}) {

  const updateData: any = {};
  
  if (data.name) {
    updateData.Username = data.name;
  }
  
  if (data.iconType) {
    updateData.User_profile_icon_type = data.iconType as 'preset' | 'custom';
  }
  
  if (data.iconPath) {
    updateData.User_profile_icon_path = data.iconPath;
  }
  
  if (Object.keys(updateData).length === 0) return;
  
  await db.profile.update({
    where: {
      UserID: userid
    },
    data: updateData
  });
}