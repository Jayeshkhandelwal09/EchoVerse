import API from "../services/api";
import { Entry } from "../types/entry";

export const fetchEntries = async (): Promise<Entry[]> => {
  const response = await API.get("/entries");
  return response.data;
};

export const createEntry = async (formData: FormData): Promise<Entry> => {
  const response = await API.post("/entries", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
