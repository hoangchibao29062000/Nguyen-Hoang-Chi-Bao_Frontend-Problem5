import axios from "axios";
import { store } from "app/store";
// import { decryptData } from 'helper/encryption.helper';

const baseURL = "http://localhost:3000/api/v1";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// const decryp = async (data: any) => {
//   const { cipherText, nonce } = data;
//   const decry = await decryptData(cipherText, nonce);
//   return decry;
// }

const decryp = async (data: any) => {
  return data;
}

// Middleware: Gắn token vào request
axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.auth?.currentUser?.access_token || localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Middleware: Xử lý response và ép kiểu thành DataResponse<T>
axiosClient.interceptors.response.use(
  async (response: any): Promise<any> => {
    try {
      // Giải mã dữ liệu nếu cần
      // ************
      const decryptedData = await decryp(response.data);
      // ************
      return decryptedData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// **✅ Hàm GET và POST với generic DataResponse<T>**
const apiClient = {
  get: async (url: string): Promise<any> => {
    const response = await axiosClient.get(url);
    return response;
  },

  post: async (url: string, body: any): Promise<any> => {
    const response = await axiosClient.post(url, body);
    return response;
  },

  put: async (url: string, body: any): Promise<any> => {
    const response = await axiosClient.put(url, body);
    return response;
  },
};

export default apiClient;

