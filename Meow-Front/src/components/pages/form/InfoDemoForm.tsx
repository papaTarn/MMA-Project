import DynamicForm from '@/components/ui/DynamicForm';
import { Fields } from '@/shared/model/dynamic-form.model';
import { InfoCircleFilled } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';

export interface InfoFormProps {
  info: {
    username: string;
    age: number;
    gender: string;
  };
}

const ErrorMessage = ({ msg }: { msg: string }) => {
  return (
    <div className="flex gap-1">
      <InfoCircleFilled />
      {msg}
    </div>
  );
};

const fields: Fields<InfoFormProps> = [
  {
    type: 'TEXT',
    label: 'Username',
    name: ['info', 'username'],
    rules: [{ required: true, message: <ErrorMessage msg="Please input your ${label}!" /> }],
  },
  {
    type: 'DROPDOWN',
    label: 'Gender',
    name: ['info', 'gender'],
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
    rules: [{ required: true, message: 'Please select your gender!' }],
  },
  {
    type: 'DATE',
    label: 'Date of Birth',
    name: ['info', 'age'],
    rules: [{ required: true, message: 'Please select your date of birth!' }],
  },
];

function InfoForm() {
  return (
    <Card title="Information">
      <div className="grid grid-cols-3 gap-1">
        <DynamicForm.Items fields={fields} />
      </div>
    </Card>
  );
}

export default InfoForm;
