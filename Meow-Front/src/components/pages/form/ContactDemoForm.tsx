import DynamicForm from '@/components/ui/DynamicForm';
import { Fields } from '@/shared/model/dynamic-form.model';
import { Card } from 'antd';
import React from 'react';

export interface ContactFormProps {
  email: string;
  phoneNumber: string;
  preferredContactMethod: string;
}

const contactFields: Fields<ContactFormProps> = [
  {
    type: 'TEXT',
    label: 'Email Address',
    name: 'email',
    rules: [{ required: true, message: 'Please input your email address!' }],
  },
  {
    type: 'TEXT',
    label: 'Phone Number',
    name: 'phoneNumber',
    rules: [{ required: true, message: 'Please input your phone number!' }],
  },
  {
    type: 'DROPDOWN',
    label: 'Preferred Contact Method',
    name: 'preferredContactMethod',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Text Message', value: 'text' },
    ],
    rules: [{ required: true, message: 'Please select a contact method!' }],
  },
];

function ContactForm() {
  return (
    <Card title="Contact">
      <div className="grid grid-cols-1 gap-1">
        <DynamicForm.Items fields={contactFields} />
      </div>
    </Card>
  );
}

export default ContactForm;
