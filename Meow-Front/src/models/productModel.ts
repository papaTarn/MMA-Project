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
  qty: number;
  prodId: number;
}

export interface UpdateCartRequest {
  qty: number;
}

export interface ProdRequest {
  cateId: number | string | null;
  page: number;
  pageSize: number;
}

export interface FavRequest {
  refProdId: number;
}

export interface AddCartRequest {
  refProdId: number;
  qty: number,
  status: number
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

export interface HistoryResponse {
  isSuccess: boolean;
  message: string;
  result: HistoryItem;
}

export interface HistoryItem {
  lastOrderGroup: HistoryGroupItem[];
  otherOrdersGroup: HistoryGroupItem[];
}

export interface HistoryGroupItem {
  id: number;
  refProdId: number;
  prodName: string;
  prodDetail: string;
  prodImg: string;
  prodPrice: number;
  qty: number;
  createDate: Date;
}