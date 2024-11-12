export interface ProductResponse {
  isSuccess: boolean;
  message: string;
  result: Product[];
}

export interface Product {
  id: number;
  refCateId: number;
  prodName: string;
  prodDetail: string;
  prodImg: string;
  prodPrice: number;
  recommendFlag: string;
}