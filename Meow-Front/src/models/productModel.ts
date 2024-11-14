export interface ProductResponse {
  isSuccess: boolean;
  message: string;
  result: ProductItem[];
}

export interface ProductItem {
  id: number;
  refCateId?: number;
  prodName: string;
  prodDetail: string;
  prodImg: string;
  prodPrice: number;
  recommendFlag?: string;
  favFlag?: string;
  qty?: number;
}

export interface UpdateCartRequest {
  qty: number;
}

export interface ProdRequest {
  cateId: number | null;
  page: number;
  pageSize: number;
}

export interface FavRequest {
  refProdId: number;
  favFlag: string | null;
}

export interface ListResponse {
  isSuccess: boolean;
  message: string;
  result: {
    totalPage: number;
    totalRecord: number;
    list: ProductItem[];
  };
}