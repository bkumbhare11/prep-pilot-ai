import api from "@/lib/axios";

export const getAdminDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

export const getUsers = async (page, search) => {
  const res = await api.get(
    `/admin/all-users?page=${page}&limit=10&search=${search}`,
  );
  return res.data;
};

export const getSessions = async (page, search) => {
  const res = await api.get(
    `/admin/all-sessions?page=${page}&limit=10&search=${search}`,
  );
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await api.delete(`/admin/delete-user/${userId}`);
  return res.data;
};

export const deleteSession = async (sessionId) => {
  const res = await api.delete(`admin/delete-session/${sessionId}`);
  return res.data;
};
