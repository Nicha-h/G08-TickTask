import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Men1 from "../assets/ProfilePics/men1.svg";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../components/modals/ProfilePic";
import { useWindowSize } from "../hooks/useWindowSize";
import ConfirmLogout from "../components/modals/ConfirmLogout";

function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(Men1);
  const [loading, setLoading] = useState(true);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Please enter a valid email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
  async function fetchUser() {
    try {
      const userData = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              Username: "SigmaBoy",
              User_Email: "admin@gmail.com",
            }),
          1000
        )
      );

      setUser(userData);
      setProfilePicture(userData.User_profile_icon_path || Men1);
      reset({
        username: userData.Username,
        email: userData.User_Email,
      });
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchUser();
}, [reset]);


  const handleProfilePicSelect = (pic) => {
    console.log("User picked:", pic.name);
    setProfilePicture(pic.src);
  };

  const onSubmit = async (data) => {
  const payload = {
    name: data.username,
    iconType: "preset", 
    iconPath: profilePicture, 
  };

  try {
    const res = await fetch("http://localhost:3000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Update failed");
    }

    alert("Profile updated successfully!");
    navigate("/home");
  } catch (err) {
    console.error("Profile update failed:", err);
    alert("Failed to update profile");
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
          className="border-2 border-black bg-red-500 font-poppins text-white font-black py-1 px-2  rounded-lg hover:bg-red-600 hover:scale-105 transition duration-200"
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
              src={profilePicture}
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
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
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
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-center w-full mt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary2 text-white font-semibold py-2 rounded-lg transition-all"
            >
              SAVE
            </button>
          </div>
        </form>

          </div>
        </div>
        
        {/* Modal */}
        {showProfilePicModal && (
          <ProfilePic
            onClose={() => setShowProfilePicModal(false)}
            onSelect={handleProfilePicSelect}
          />
        )}

        {showLogoutModal && (
          <ConfirmLogout
            onClose={() => setShowLogoutModal(false)}
          />
        )}

      </div>
    </div>
  );
}

export default ProfileEdit;
