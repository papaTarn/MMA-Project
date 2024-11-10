import React, { useState } from 'react';
import { Avatar, Modal, Form, Input, FormProps,Button } from 'antd';
import { UserOutlined, LockFilled, MailFilled } from '@ant-design/icons';
import Image from 'next/image'
import '../../../styles/css/login.css'

const Login: React.FC = () => {

    type FieldType = {
        username?: string;
        password?: string;
    };
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


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        //postapilogin body username&password(values)  const res = (${urlapi}/api/user/login,"POST",values) มันจะส่งกลับมา res exbanner
        //postapilogin body username&password(values)  ${urlapi}/api/user/login,"POST",{username:'user01',password:'1234'}
       
        //apiBack
        // const {username,password} = req.body

        //SELECT 
        console.log('Success:', values);    
    };
    // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <>
            <Avatar
                size={50}
                icon={<UserOutlined />}
                style={{ marginLeft: 'auto' }}
                onClick={showModal}
            >
            </Avatar>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={370}
                height='100%'
            >
                <div className="fromlogin--form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Form
                        name="login"
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 550 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Image
                            src="http://localhost:3001/images/loginlogo.png"
                            alt="main logo"
                            width={250}
                            height={250}
                            className="imgLogin"
                        />
                        <Form.Item<FieldType>
                            name="username"
                        >
                            <Input type='email' placeholder="  อีเมลล์  " prefix={<MailFilled className="custom-iconMail" />} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="password"
                        >
                            <Input type='password' placeholder="  รหัสผ่าน  " prefix={<LockFilled className="custom-iconLook" />} />
                        </Form.Item>
                        <Form.Item>
                            <span>
                                <button
                                    className='px-24 py-2 gradient text-sm text-white rounded hover:transform hover:scale-105 hover:transition hover:ease-in-out rounded-full w-full'>
                                    เข้าสู่ระบบ
                                </button>
                            </span>
                        </Form.Item>
                    </Form>
                    <div className='btnRegister'>
                        <button
                            className='px-24 py-2 text-sm text-orange-500 bg-white border-2 border-orange-500 rounded hover:transform hover:scale-105 hover:transition hover:ease-in-out rounded-full w-full'
                            onClick={() => {
                                console.log('สมัครสมาชิก');
                            }}
                        >
                            สมัครสมาชิก
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Login;