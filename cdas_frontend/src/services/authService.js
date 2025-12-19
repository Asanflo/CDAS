import api from "../api/axios";

export const login = async (credentials) => {
    const response = await api.post("/v1/auth/token/", credentials);

    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    return response.data;
}