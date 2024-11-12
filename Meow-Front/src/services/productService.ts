import axiosInstance from '@/shared/config/axios.config';
import { URL } from '@/shared/constant/url.const';
import { ProductResponse } from '@/models/product';
const environment = process.env.NEXT_PUBLIC_API_URL_DEV;

export const getRecommend = async (req: any): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>(`${environment}${URL.getFavoriteListByUserId}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in createProduct:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getProductInfo = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getProductListByCate = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getFavoriteListByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const setFavourite = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getCartByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const addCart = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const updateCart = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const deleteCart = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};