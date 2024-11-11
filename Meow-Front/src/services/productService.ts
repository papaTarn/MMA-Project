import axiosInstance from '@/shared/config/axios.config';
import { URL } from '@/shared/constant/url.const'

export interface Product {
  id: number;
  refCateId: number;
  prodName: string;
  prodDetail: string;
  prodImg: string;
  prodPrice: number;
  recommendFlag: string;
}

export interface ProductResponse {
  isSuccess: boolean;
  message: string;
  result: Product[];
}


const urlapi = process.env.NEXT_PUBLIC_API_URL_DEV1
// export const createProduct = async (payload: CreateProductPayload): Promise<ReturnResponse> => {
//   try {
//     const response = await axiosInstance.post<ReturnResponse>('/', payload);
//     return response.data;
//   } catch (error) {
//     console.error('Error in createProduct:', error);
//     throw error; // ส่ง error กลับไปให้ component handle
//   }
// };

export const getFavoriteListByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${urlapi}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};