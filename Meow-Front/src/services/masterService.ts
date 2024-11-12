import axiosInstance from '@/shared/config/axios.config';
import { URL } from '@/shared/constant/url.const';
import { MasterResponse } from '@/models/master';
const environment = process.env.NEXT_PUBLIC_API_URL_DEV;

export const getAutoPlaySpeed = async (): Promise<MasterResponse> => {
  try {
    const response = await axiosInstance.get<MasterResponse>(`${environment}${URL.getAutoPlaySpeed}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getBanner = async (): Promise<MasterResponse> => {
  try {
    const response = await axiosInstance.get<MasterResponse>(`${environment}${URL.getBanner}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getAllMessage = async (): Promise<MasterResponse> => {
  try {
    const response = await axiosInstance.get<MasterResponse>(`${environment}${URL.getAllMessage}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getAllCategory = async (): Promise<MasterResponse> => {
  try {
    const response = await axiosInstance.get<MasterResponse>(`${environment}${URL.getAllCategory}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getAllConfig = async (): Promise<MasterResponse> => {
  try {
    const response = await axiosInstance.get<MasterResponse>(`${environment}${URL.getAllConfig}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};