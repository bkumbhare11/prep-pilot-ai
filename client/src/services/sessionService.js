import api from "@/lib/axios";

export const createSession = async (formData) => {
  const res = await api.post("/session/create-session", formData);
  return res.data;
};

export const getSession = async (sessionId) => {
  const res = await api.get(`/session/${sessionId}`);
  return res.data;
};

export const submitAnswer = async (sessionId, data) => {
  const res = await api.post(`/session/${sessionId}/answer`, data);
  return res.data;
};

export const finishSession = async (sessionId) => {
  const res = await api.post(`/session/${sessionId}/finish-session`);
  return res.data;
};

export const getResult = async (sessionId) => {
  const res = await api.get(`/session/${sessionId}/result`);
  return res.data;
};

export const getHistory = async (page, search) => {
  const res = await api.get(
    `/session/history?page=${page}&limit=10&search=${search}`,
  );
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get("/session/dashboard-stats");
  return res.data;
};

export const deleteSession = async (sessionId) => {
  const res = await api.delete(`session/${sessionId}/delete-session`);
  return res.data;
};
