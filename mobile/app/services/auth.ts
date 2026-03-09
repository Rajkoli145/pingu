const API_URL = "http://localhost:5001";

/**
 * Stores the authentication token in memory for now.
 * In a real app, use SecureStore from expo-secure-store.
 */
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export const register = async (userData: any) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  const data = await response.json();
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

export const getMe = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { 
      "Authorization": `Bearer ${authToken}`
    }
  });
  return await response.json();
};
