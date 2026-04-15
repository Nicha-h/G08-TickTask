import { redirect } from "react-router-dom";
import { apiClient } from "../util/apiClient";

export const homeLoader = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return redirect("/login");
  }

  try {
    const response = await apiClient.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { username: response.data.Username };
  } catch (err) {
    console.error("Failed to fetch user data:", err);
    localStorage.removeItem('token');
    return redirect("/login");
  }
};