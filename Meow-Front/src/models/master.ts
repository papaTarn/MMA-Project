export interface MasterResponse {
  isSuccess: boolean;
  message: string;
  result: Master[];
}

export interface Master {
  id: number;
  code: string;
  value: string;
}