import {
  Column,
  Columns,
  PageStage,
  TableColumns,
  TableModel,
  TableOnChange,
  TableRowSelection,
} from '@/shared/model/table.model';
import { Table as AntTable, TablePaginationConfig } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { map } from 'lodash';
import React from 'react';

interface TableProps<T extends TableModel> {
  columns: Columns<T>;
  data: T[];
  onChange?: TableOnChange<T>;
  rowSelection?: TableRowSelection<T>;
  pagination?: false | TablePaginationConfig;
  onRowClick?: (value: T, index?: number) => void;
}

const mapTableColumns = <T extends TableModel>(col: Column<T>) => {
  return {
    title: col.title,
    dataIndex: col.key,
    sorter: col.sort === 'show',
    width: col.width,
    fixed: col.fixed,
    showSorterTooltip: false,
    render: col.render,
  };
};

const mapPageStage = <T extends TableModel>(
  pagination: TablePaginationConfig,
  sorter: SorterResult<T> | SorterResult<T>[],
): PageStage => {
  let sortField: string | undefined;
  let sortOrder: 'asc' | 'desc' | undefined;

  if (Array.isArray(sorter)) {
    const firstSorter = sorter[0];
    sortField = firstSorter?.field as string;
    sortOrder = firstSorter?.order === 'ascend' ? 'asc' : 'desc';
  } else {
    sortField = sorter?.field as string;
    sortOrder = sorter?.order === 'ascend' ? 'asc' : 'desc';
  }

  return {
    pageSize: pagination.pageSize,
    current: pagination.current,
    sortField: sortField,
    sortOrder: sortOrder,
  };
};

function Table<T extends TableModel>(props: Readonly<TableProps<T>>) {
  const { columns, data, onChange, rowSelection, pagination, onRowClick } = props;
  const tableColumns: TableColumns<T> = map(columns, mapTableColumns) as TableColumns<T>;
  const showTotal = (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`;

  return (
    <AntTable<T>
      bordered
      onRow={(record, rowIndex) => ({
        onClick: () => onRowClick && onRowClick(record, rowIndex),
      })}
      rowClassName={onRowClick ? 'cursor-pointer' : ''}
      columns={tableColumns}
      dataSource={data.map(val => ({ ...val, key: val.id }))}
      rowSelection={rowSelection ? { ...rowSelection, type: 'checkbox', fixed: true } : rowSelection}
      onChange={onChange}
      pagination={pagination ? { ...pagination, showTotal } : pagination}
      scroll={{ x: 'max-content' }}
    />
  );
}

Table.mapPageStage = mapPageStage;

export default Table;
