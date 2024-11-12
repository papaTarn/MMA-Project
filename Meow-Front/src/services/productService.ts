import axios from 'axios';
import axiosInstance from '@/shared/config/axios.config';
import { URL } from '@/shared/constant/url.const';
import {
  ProductResponse,
  UpdateCartRequest,
  ProdRequest,
  FavRequest
} from '@/models/productModel';
const environment = process.env.NEXT_PUBLIC_API_URL_DEV;

const handleError = (error: any): void => {
  if (axios.isAxiosError(error) && error.response) {
    // ตรวจสอบว่า error เป็น AxiosError และมี response
    switch (error.response.status) {
      case 403:
        console.error('Forbidden: You do not have permission to access this resource.');
        alert('You do not have permission to access this resource.');
        break;
      case 404:
        console.error('Not Found: The requested resource does not exist.');
        alert('The requested resource does not exist.');
        break;
      case 500:
        console.error('Server Error: Something went wrong on the server.');
        alert('Server Error: Something went wrong. Please try again later.');
        break;
      default:
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
        alert(`Error: ${error.response.status} - ${error.response.statusText}`);
        break;
    }
  } else {
    console.error('Unknown error occurred:', error);
    alert('An unknown error occurred.');
  }
};

export const getRecommend = async (req: ProdRequest): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(`${environment}${URL.getRecommend}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in getRecommend:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getProductInfo = async (prodId: number): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getProductInfo}/${prodId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in getProductInfo:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getProductListByCate = async (req: ProdRequest): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(`${environment}${URL.getProductListByCate}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in getProductListByCate:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getFavoriteListByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    handleError(error);  // เรียกใช้ฟังก์ชันจัดการข้อผิดพลาด
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const setFavourite = async (req: FavRequest): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(`${environment}${URL.setFavourite}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in setFavourite:', error);
    throw error;
  }
};

export const getCartByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in getCartByUserId:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const addCart = async (req: FavRequest): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(`${environment}${URL.addCart}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in addCart:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const updateCart = async (req: Partial<UpdateCartRequest>): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.patch<ProductResponse>(`${environment}${URL.updateCart}`, req);
    return response.data;
  } catch (error) {
    console.error('Error in partiallyUpdateProduct:', error);
    throw error;
  }
};

export const deleteCart = async (id: string): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`${environment}${URL.deleteCart}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteCart:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};