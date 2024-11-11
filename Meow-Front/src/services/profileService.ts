import axiosInstance from '../shared/config/axios.config';

// ประเภทข้อมูลของ Product ที่เราจะใช้
export interface Product {
  id: number;
  name: string;
  price: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<Product[]>('/getProducts'); // ประเภทข้อมูลของ response เป็น Product[]
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error; // ส่ง error กลับไปให้ component handle
  }
};