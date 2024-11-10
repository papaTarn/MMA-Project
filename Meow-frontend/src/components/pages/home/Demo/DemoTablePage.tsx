'use client';
import Table from '@/components/ui/Table';
import useNotification from '@/hooks/useNotification';
import { TableModel, Columns, PageStage, TableOnChange, TableRowSelection } from '@/shared/model/table.model';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface User extends TableModel {
  name: string;
  username: string;
  email: string;
}

const columns: Columns<User> = [
  {
    title: 'Name',
    key: 'name',
    sort: 'show',
    width: '800px',
  },
  {
    title: 'Username',
    key: 'username',
    width: '500px',
  },
  {
    title: 'Email',
    key: 'email',
    width: '150px',
  },
  {
    title: 'Actions',
    key: 'id',
    width: '150px',
    fixed: 'right',
    render(text, record, index) {
      return (
        <div className="flex justify-center">
          <Button icon={<EditOutlined />} />
        </div>
      );
    },
  },
];

interface Props {
  user: User[];
}

function DemoTablePage(props: Readonly<Props>) {
  const [pagination, setPagination] = useState<PageStage>({ pageSize: 10, total: 100, current: 1 });
  const { error } = useNotification();
  const { t } = useTranslation();

  useEffect(() => {
    error({ message: 'Internal Server Error.' });
  }, []);

  const onChange: TableOnChange<User> = (newPagination, _, sorter) => {
    setPagination({
      ...pagination,
      ...Table.mapPageStage<User>(newPagination, sorter),
    });
  };

  const rowSelection: TableRowSelection<User> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  return (
    <Card className="w-full">
      <h1 className="mb-2 text-3xl">{t('user.title')}</h1>
      <Table<User>
        columns={columns}
        data={props.user ?? []}
        pagination={pagination}
        onChange={onChange}
        rowSelection={rowSelection}
      />
    </Card>
  );
}

export default DemoTablePage;
