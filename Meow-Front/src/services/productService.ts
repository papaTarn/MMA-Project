import axios from 'axios';
import axiosInstance from '@/shared/config/axios.config';
import { URL } from '@/shared/constant/url.const';
import {
  ProductResponse,
  UpdateCartRequest,
  ProdRequest,
  FavRequest,
  ListResponse,
  AddCartRequest,
  ProductItem,
  OrderRequest,
  ListOrderResponse,
  OrderByIdRequest,
  OrderDetailResponse
} from '@/models/productModel';
const environment = process.env.NEXT_PUBLIC_API_URL_DEV;

export const getRecommend = async (req: ProdRequest): Promise<ListResponse> => {
  try {
    const response = await axiosInstance.post<ListResponse>(`${environment}${URL.getRecommend}`, req);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getProductInfo = async (prodId: string): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getProductInfo}/${prodId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getProductListByCate = async (req: ProdRequest): Promise<ListResponse> => {
  try {
    const response = await axiosInstance.post<ListResponse>(`${environment}${URL.getProductListByCate}`, req);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getFavoriteListByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getFavoriteListByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const setFavourite = async (req: FavRequest): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(`${environment}${URL.setFavourite}`, req);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getCartByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getCartByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const getCountCartByUserId = async (): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.get<ProductResponse>(`${environment}${URL.getCountCartByUserId}`);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const addCart = async (req: AddCartRequest): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.post<ProductResponse>(`${environment}${URL.addCart}`, req);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const updateCart = async (req: any): Promise<ProductResponse> => {
  try {
    const response = await axiosInstance.patch<ProductResponse>(`${environment}${URL.updateCart}`, req);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const deleteCart = async (prodId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`${environment}${URL.deleteCart}/${prodId}`);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const orderHistoryAll = async (req: OrderRequest): Promise<ListOrderResponse> => {
  try {
    const response = await axiosInstance.post<ListOrderResponse>(`${environment}${URL.orderHistoryAll}`, req);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};

export const orderHistoryById = async (req: OrderByIdRequest): Promise<OrderDetailResponse> => {
  try {
    const response = await axiosInstance.post<OrderDetailResponse>(`${environment}${URL.orderHistoryById}`, req);
    return response.data;
  } catch (error) {
    throw error; // ส่ง error กลับไปให้ component handle
  }
};