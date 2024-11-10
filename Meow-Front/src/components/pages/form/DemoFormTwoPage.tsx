'use client';
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { RuleObject } from 'antd/es/form';
import { InfoCircleFilled } from '@ant-design/icons';

function DemoFormTwoPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form Values:', values);
  };

  const validatePassword = (_: RuleObject, value: string) => {
    if (!value) {
      setPasswordErrorMessage('Password is required');
      return Promise.reject();
    }
    return Promise.resolve();
  };

  const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
    <div className="flex gap-1">
      {label}
      {required && <span className="required-text">*</span>}
    </div>
  );

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ name: '', email: '', password: '' }}
      requiredMark={customizeRequiredMark}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: (<span className="error-text"><InfoCircleFilled /> Name is required</span>) }]}>
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: (<span className="error-text"><InfoCircleFilled /> Please enter a valid email</span>) },
        ]}>
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ validator: validatePassword }]}>
        <Input.Password placeholder="Enter your password" />
        {passwordErrorMessage && (
          <span className="error-text">
            <InfoCircleFilled style={{ marginRight: 4 }}/>
            {passwordErrorMessage}
          </span>
        )}

      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default DemoFormTwoPage;
