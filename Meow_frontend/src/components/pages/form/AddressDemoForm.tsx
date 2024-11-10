import DynamicForm from '@/components/ui/DynamicForm';
import { Fields } from '@/shared/model/dynamic-form.model';
import { Card } from 'antd';
import React from 'react';

export interface AddressFormProps {
  street: string;
  city: string;
  postalCode: string;
}

const addressFields: Fields<AddressFormProps> = [
  {
    type: 'TEXT',
    label: 'Street Address',
    name: 'street',
    rules: [{ required: true, message: 'Please input your street address!' }],
  },
  {
    type: 'TEXT',
    label: 'City',
    name: 'city',
    rules: [{ required: true, message: 'Please input your city!' }],
  },
  {
    type: 'TEXT',
    label: 'Postal Code',
    name: 'postalCode',
    rules: [{ required: true, message: 'Please input your postal code!' }],
  },
];

function AddressForm() {
  return (
    <Card title="Address">
      <div className="grid grid-cols-2 gap-1">
        <DynamicForm.Items fields={addressFields} />
      </div>
    </Card>
  );
}

export default AddressForm;
