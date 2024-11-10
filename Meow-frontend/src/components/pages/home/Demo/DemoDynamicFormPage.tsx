'use client';

import { Button, Form } from 'antd';
import React from 'react';
import InfoForm, { InfoFormProps } from '../../form/InfoDemoForm';
import AddressForm, { AddressFormProps } from '../../form/AddressDemoForm';
import ContactForm, { ContactFormProps } from '../../form/ContactDemoForm';
import DynamicForm from '@/components/ui/DynamicForm';

type MyFormValues = ContactFormProps & InfoFormProps & AddressFormProps;

function DemoDynamicFormPage() {
  const [form] = Form.useForm<MyFormValues>();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
  };

  return (
    <DynamicForm form={form} onSubmit={onFinish}>
      <div className="flex flex-col gap-2">
        <InfoForm />
        <AddressForm />
        <ContactForm />
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </div>
    </DynamicForm>
  );
}

export default DemoDynamicFormPage;
