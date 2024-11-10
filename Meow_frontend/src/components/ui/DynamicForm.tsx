'use client';

import { Field, Fields } from '@/shared/model/dynamic-form.model';
import { Checkbox, DatePicker, Form, FormInstance, Input, Radio, Select, TimePicker } from 'antd';
import React from 'react';

interface DynamicFormProps<T> {
  name?: string;
  fields?: Fields<T>;
  children?: React.ReactNode;
  form?: FormInstance<T>;
  onSubmit?: (value: T) => void;
  onValuesChange?: (changedValues: any, values: T) => void;
}

interface DynamicItemProps<T> {
  fields: Fields<T>;
}

const DynamicForm = <T extends object>(props: DynamicFormProps<T>) => {
  const { name, children, form, onSubmit, onValuesChange, fields } = props;
  return (
    <Form
      name={name}
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      requiredMark={customizeRequiredMark}
      onValuesChange={onValuesChange}>
      {fields && <Items fields={fields} />}
      {children}
    </Form>
  );
};

const renderFormField = <T extends object>(field: Field<T>) => {
  switch (field.type) {
    case 'TEXT':
      return <Input />;
    case 'DROPDOWN':
      return (
        <Select placeholder={`Select ${field.label}`}>
          {field.options?.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    case 'MULTI_SELECT':
      return (
        <Select mode="multiple" placeholder={`Select ${field.label}`}>
          {field.options?.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    case 'DATE':
      return <DatePicker />;
    case 'TIME':
      return <TimePicker />;
    case 'DATE_TIME':
      return <DatePicker showTime />;
    case 'CHECKBOX':
      return <Checkbox />;
    case 'CHECKBOX_GROUP':
      return (
        <Checkbox.Group>
          {field.options?.map(option => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );
    case 'RADIO_GROUP':
      return (
        <Radio.Group>
          {field.options?.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    default:
      return null;
  }
};

const Items = <T extends object>({ fields }: DynamicItemProps<T>) => {
  return (
    <React.Fragment>
      {fields.map(field =>
        field.type === 'CUSTOM' && field.custom ? (
          field.custom
        ) : (
          <Form.Item
            key={String(field.name)}
            label={field.label}
            name={field.name}
            rules={field.rules}
            valuePropName={field.type === 'CHECKBOX' ? 'checked' : 'value'}>
            {renderFormField(field)}
          </Form.Item>
        ),
      )}
    </React.Fragment>
  );
};

const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <div className="flex gap-1">
    {label}
    {required && <span className="text-red-400">*</span>}
  </div>
);

DynamicForm.Items = Items;
DynamicForm.requiredMark = customizeRequiredMark;

export default DynamicForm;
