import api from "@/lib/axios";

export const registerUser = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await api.post("/auth/login", formData);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const forgotPassword = async (formData) => {
  const res = await api.post("/auth/forgot-password", formData);
  return res.data;
};

export const resetPassword = async (token, formData) => {
  const res = await api.post(`/auth/reset-password/${token}`, formData);
  return res.data;
};

export const changePassword = async (formData) => {
  const res = await api.post("/auth/change-password", formData);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await api.delete("/auth/delete-account");
  return res.data;
};
