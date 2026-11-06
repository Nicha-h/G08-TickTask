import { db } from '../index.js'

// Maps a Neon Auth user to the app's User row, creating it (with its default profile and category) on first sight
export async function findOrCreateUserByAuth(authUserId: string, email: string): Promise<number> {
  const linked = await db.user.findUnique({ where: { authUserId } });
  if (linked) return linked.UserID;

  // A row for this email from before Neon Auth is linked rather than duplicated
  const byEmail = await db.user.findUnique({ where: { User_Email: email } });
  if (byEmail) {
    await db.user.update({ where: { UserID: byEmail.UserID }, data: { authUserId } });
    return byEmail.UserID;
  }

  try {
    return await createUserInDb(authUserId, email);
  } catch (err: any) {
    // Concurrent first requests for the same user: the other one created it
    if (err?.code === 'P2002') {
      const existing = await db.user.findUnique({ where: { authUserId } });
      if (existing) return existing.UserID;
    }
    throw err;
  }
}

async function createUserInDb(authUserId: string, email: string) {
  const user = await db.user.create({
    data: {
      User_Email: email,
      authUserId,
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