export interface BaseResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface Option {
  label: string;
  value: string;
}

export type Options = Option[];
