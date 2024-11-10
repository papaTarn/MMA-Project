import { TableProps } from 'antd';

type FixedType = 'left' | 'right' | boolean;

export interface TableModel {
  id: string;
  action: string;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}

export interface Column<T extends TableModel> {
  key: TableKeys<T>;
  title: string;
  sort?: 'show' | 'hidden';
  width?: string;
  fixed?: FixedType;
  render?: (text: string, record: T, index: number) => React.ReactNode;
}

export interface PageStage {
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  total?: number;
  current?: number;
}

export type Columns<T extends TableModel> = Column<T>[];
export type TableKeys<T extends TableModel> = keyof T;
export type TableColumns<T extends TableModel> = TableProps<T>['columns'];
export type TableRowSelection<T extends TableModel> = TableProps<T>['rowSelection'];
export type TableOnChange<T extends TableModel> = TableProps<T>['onChange'];
