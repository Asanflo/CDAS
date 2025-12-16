import api from "../api/axios";

/**
 * INSCRIPTION classique
 * POST /api/v1/auth/inscription/
 */
export const registerUser = async (userData) => {
    const response =await api.post("/v1/auth/inscription/", userData);

    return response.data;
};

/**
 * LOGIN avec Google
 * POST /api/v1/auth/google/login/
 */
export const loginWithGoogle = async (googleToken) => {
    const response = await api.post("/v1/auth/google/login/", {token: googleToken,  });

    return response.data;
};
