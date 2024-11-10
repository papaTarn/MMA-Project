import React, { useState } from 'react';
import { Modal } from 'antd';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { UserOutlined, LockFilled, MailFilled } from '@ant-design/icons';
import Image from 'next/image';

type Props = {};

const Register: React.FC = () => {
    //#region modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //#endregion modal

    //#region field form
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    //#endregion field form

    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-center">
                    <Image src="http://localhost:3001/images/loginlogo.png" alt="Logo xl" className="my-12" />
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">

                        <Form.Item<FieldType>
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input type="email" placeholder="&nbsp;อีเมล" prefix={<MailFilled className="custom-iconMail" />} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password type='password' placeholder='&nbsp;รหัสผ่าน' prefix={<LockFilled className="custom-iconLook" />} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className='px-24 py-2 gradient text-sm text-white rounded hover:transform hover:scale-105 hover:transition hover:ease-in-out rounded-full w-full'
                            >
                                ลงทะเบียน
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
};

export default Register;
