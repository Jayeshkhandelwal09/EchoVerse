import API from "../services/api";
import { LoginPayload, RegisterPayload, User } from "../types/auth";

export const registerUser = async (data: RegisterPayload): Promise<User> => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload): Promise<User> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
