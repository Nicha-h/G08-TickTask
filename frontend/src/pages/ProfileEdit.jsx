/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../components/modals/ProfilePic";
import { useWindowSize } from "../hooks/useWindowSize";
import ConfirmLogout from "../components/modals/ConfirmLogout";
import { apiClient } from "../util/apiClient";
import Men1 from "../assets/ProfilePics/men1.svg";
import Men2 from "../assets/ProfilePics/men 2.svg";
import Men3 from "../assets/ProfilePics/men3.svg";
import Men4 from "../assets/ProfilePics/men 4.svg";
import Men5 from "../assets/ProfilePics/men 5.svg";
import Men from "../assets/ProfilePics/men.svg";
import Women1 from "../assets/ProfilePics/women 1.svg";
import Women2 from "../assets/ProfilePics/women 2.svg";
import Women3 from "../assets/ProfilePics/women 3.svg";
import Women from "../assets/ProfilePics/women.svg";

function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState("Men1");
  const [loading, setLoading] = useState(true);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const presetMap = {
    Men1,
    Men2,
    Men3,
    Men4,
    Men5,
    Men,
    Women1,
    Women2,
    Women3,
    Women,
  };

  const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const getProfilePicSrc = (picturePath) => {
  if (!picturePath) return Men1;

  const src = typeof picturePath === 'string'
    ? picturePath
    : picturePath?.src;

  if (typeof src !== 'string') return Men1; // Ensure it's a string

  if (src.startsWith("data:image")) {
    return src;
  }

  if (src.startsWith('http')) {
    return src;
  }

  if (presetMap[src]) {
    return presetMap[src];
  }

  return Men1; // fallback
};


  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await apiClient.get("/api/users/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("Fetched user data:", userData);

        setUser(userData);
        setProfilePicture(userData.User_profile_icon_path || "Men1");

        reset({
          username: userData.Username || "",
          email: userData.user?.User_Email || userData.User_Email || "",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
        alert("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [reset, navigate]);

  const handleProfilePicSelect = (pic) => {
  console.log("User picked:", pic.name);
  if (pic.isCloudinary) {
    setProfilePicture(pic.src);
  } else if (pic.name === "CustomUpload") {
    setProfilePicture(pic.src);
  } else {
    setProfilePicture(pic.name);
  }
};

  const onSubmit = async (data) => {
  setIsUpdating(true);

  const formName = data.username;

  let selectedPic = { name: "preset", src: profilePicture };

  if (profilePicture.startsWith("data:image")) {
    selectedPic = { name: "custom", src: profilePicture };
  } else if (profilePicture.startsWith("https://res.cloudinary.com")) {
    selectedPic = { name: "cloudinary", src: profilePicture };
  } else {
    selectedPic = { name: profilePicture, src: profilePicture };
  }
  const payload = {
    name: formName,
    iconType: selectedPic.name === "custom" ? "custom" : "preset",
    iconPath: selectedPic.src,
  };

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const res = await apiClient.put("/api/users/profile", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Profile update failed");
    }

    alert("Profile updated!");
    const updatedResponse = await apiClient.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (updatedResponse.ok) {
      const updatedUser = await updatedResponse.json();
      setUser(updatedUser);
      setProfilePicture(updatedUser.User_profile_icon_path || "Men1");
      reset({
        username: updatedUser.Username || "",
        email: updatedUser.user?.User_Email || updatedUser.User_Email || "",
      });
    }

    navigate("/home");
  } catch (error) {
    console.error("Profile update failed:", error);
    alert("Failed to update profile");
  } finally {
    setIsUpdating(false);
  }
};


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full bg-white font-poppins">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-white font-poppins">
      {isMobile && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="border-2 border-black bg-red-500 font-poppins text-white font-black py-1 px-2 rounded-lg hover:bg-red-600 hover:scale-105 transition duration-200"
          >
            Sign out
          </button>
        </div>
      )}

      <div className="flex flex-col items-center max-h-screen w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full -mt-30 mr-0 md:-mt-90 md:mr-50 lg:-mt-90 lg:mr-100">
          {/* Left side - Title and Profile Picture */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <h1 className="text-2xl font-bold mb-8">Profile Editor</h1>
            <img
              src={getProfilePicSrc(profilePicture)}
              alt="Profile"
              className="w-[120px] h-[120px] rounded-full object-cover cursor-pointer hover:opacity-80 transition"
              onClick={() => setShowProfilePicModal(true)}
            />

          </div>

          {/* Right side - Form */}
          <div className="flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
              {/* Username */}
              <div className="flex flex-col w-full">
                <label className="text-sm mb-1">Username</label>
                <input
                  {...register("username")}
                  className="border-2 rounded-lg px-3 py-2 text-sm w-full"
                  disabled={isUpdating}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Email (read-only) */}
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <label className="text-sm mb-1">Email</label>
                  <span className="text-xs text-gray-400">(cannot edit)</span>
                </div>
                <input
                  {...register("email")}
                  readOnly
                  className="border-2 bg-gray-100 text-gray-500 rounded-lg px-3 py-2 text-sm w-full cursor-not-allowed"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-center w-full mt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-primary hover:bg-primary2 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "SAVING..." : "SAVE"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Profile Picture Modal */}
        {showProfilePicModal && (
          <ProfilePic 
            onClose={() => setShowProfilePicModal(false)} 
            onSelect={handleProfilePicSelect} 
          />
        )}

        {/* Logout Modal */}
        {showLogoutModal && (
          <ConfirmLogout onClose={() => setShowLogoutModal(false)} />
        )}
      </div>
    </div>
  );
}

export default ProfileEdit;