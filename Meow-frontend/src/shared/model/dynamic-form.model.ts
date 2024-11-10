import { Rule } from 'antd/es/form';
import { Options } from './base.model';
import { NamePath } from 'antd/es/form/interface';

export type FieldType =
  | 'TEXT'
  | 'DROPDOWN'
  | 'DATE'
  | 'TIME'
  | 'DATE_TIME'
  | 'CHECKBOX'
  | 'CHECKBOX_GROUP'
  | 'RADIO_GROUP'
  | 'MULTI_SELECT'
  | 'CUSTOM';

export interface Field<T> {
  type: FieldType;
  label: string;
  name: NamePath<T>;
  options?: Options;
  rules?: Rule[];
  custom?: React.ReactNode;
}

export type Fields<T> = Field<T>[];
