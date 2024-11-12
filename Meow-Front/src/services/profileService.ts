import axiosInstance from '@/shared/config/axios.config';
import { URL } from '@/shared/constant/url.const';
import { ProductResponse } from '@/models/productModel';
const environment = process.env.NEXT_PUBLIC_API_URL_DEV;

export const register = async (req: any): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(`${environment}${URL.register}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const checkLogin = async (req: any): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(`${environment}${URL.checkLogin}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getUserById = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getUserById}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const updateProfile = async (req: any): Promise<any> => {
  try {
    const response = await axiosInstance.patch<any>(`${environment}${URL.updateProfile}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const createAddress = async (req: any): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(`${environment}${URL.createAddress}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getAddressByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getAddressByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const updateAddress = async (req: any): Promise<any> => {
  try {
    const response = await axiosInstance.patch<any>(`${environment}${URL.updateAddress}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const updateDefaultAddress = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.patch<ProductResponse>(`${environment}${URL.updateDefaultAddress}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const deleteAddress = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.delete<ProductResponse>(`${environment}${URL.deleteAddress}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getHistoryByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getHistoryByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};