import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Input, Button, message, Typography, Flex } from "antd";
import useNotification from "@/hooks/useNotification";
import useModal from "@/hooks/useModal";
import { login, register } from "@/services/profileService";
import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

interface LoginModalProps {
  visible: boolean;
  onCancel: () => void;
  onLoginSuccess: () => void;
}

const { Text } = Typography;
const urlImg = 'http://localhost:3001/images/';

const LoginModal: React.FC<LoginModalProps> = ({ visible, onCancel, onLoginSuccess }) => {
  const router = useRouter();
  const { success, errors, warning, info } = useNotification();
  const { modalConfirm, modalInfo, modalWarning, modalError } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [isRegister, setIsRegister] = useState<boolean>(false);

  // const handleLogin = async (values: { email: string; password: string }) => {
  //   try {
  //     let user = {
  //       email: values.email,
  //       password: values.password,
  //     }
  //     setLoading(true);
  //     const data = await login(user);
  //     if (data.isSuccess) {
  //       form.resetFields(); // ล้างค่าฟอร์ม
  //       message.success("Logged in successfully!");
  //       localStorage.setItem('_token', data.result.token)
  //       onLoginSuccess(); // เรียกฟังก์ชันที่ส่งมาจาก Navbar เมื่อ login สำเร็จ
  //       onCancel(); // ปิด Modal
  //     } else {
  //       setErrorMessage(data.message);
  //     }
  //   } catch (err: any) {
  //     modalError({
  //       title: err?.message,
  //       content: err?.description,
  //       onOk: () => { },
  //       onCancel: () => { },
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const handleCancel = async () => {
    form.resetFields(); // ล้างค่าฟอร์ม
    // router.refresh();
    setErrorMessage(null);
    onCancel(); // ปิด Modal
  }

  const handleLogin = () => {
    const { email, password } = form.getFieldsValue();
    console.log('Logging in with:', { email, password });
    // Call API สำหรับ login (ตัวอย่าง)
    message.success('Logged in successfully!');
  };

  const handleRegister = async () => {
    setIsRegister(true);
    // try {
    //   let user = {
    //     email: form.getFieldValue('email'),
    //     password: form.getFieldValue('password')
    //   }
    //   setLoading(true);
    //   const data = await register(user);
    //   if (data.isSuccess) {
    //     form.resetFields(); // ล้างค่าฟอร์ม
    //     message.success("Logged in successfully!");
    //     localStorage.setItem('_token', data.result.token)
    //     onLoginSuccess(); // เรียกฟังก์ชันที่ส่งมาจาก Navbar เมื่อ login สำเร็จ
    //     onCancel(); // ปิด Modal
    //   } else {
    //     setErrorMessage(data.message);
    //   }
    // } catch (err: any) {
    //   modalError({
    //     title: err?.message,
    //     content: err?.description,
    //     onOk: () => { },
    //     onCancel: () => { },
    //   });
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <Modal visible={visible} onCancel={() => handleCancel()} keyboard={false} maskClosable={false} footer={null}>
      <Flex justify='center' align='center'>
        <img
          src={`${urlImg}loginlogo.png`}
          style={{ objectFit: 'cover' }}
          width={200}
          height={200}
        />
      </Flex>

      <Form form={form} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        {isRegister && (
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
        )}
        <div style={{ display: 'flex', gap: '10px' }}>
          {!isRegister && (
            <Button shape="round" style={{ width: "100%", marginTop: "10px" }} loading={loading} className="primary-btn" onClick={handleLogin}>
              เข้าสู่ระบบ
            </Button>
          )}
          <Button shape="round" style={{ width: "100%", marginTop: "10px" }} className="primary-btn-border"
            onClick={() => {
              if (isRegister) {
                handleRegister();
              } else {
                setIsRegister(true);
                form.resetFields(); // รีเซ็ตฟอร์มเมื่อสลับไปที่ Register
              }
            }}
          >
            สมัครสมาชิก
          </Button>
        </div>
      </Form>

      {/* <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email ต้องตรงตาม Format Email เมี๊ยว',
            },
            {
              required: true,
              message: 'กรุณาระบุ Email เมี๊ยว',
            },
          ]}
        >
          <Input placeholder="E-mail" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              min: 6,
              max: 10,
              message: 'Password ต้องมีความยาว 6-10 ตัวอักษร เมี๊ยว',
            },
            {
              required: true,
              message: 'กรุณาระบุ Password เมี๊ยว',
            },
          ]}
        >
          <Input.Password placeholder="Password" prefix={<KeyOutlined />} />
        </Form.Item>
        {errorMessage && (
          <div style={{ marginBottom: "10px" }}>
            <Text type="danger">{errorMessage}</Text>
          </div>
        )}
        <Form.Item style={{ marginBottom: 0 }}>
          <Button shape="round" htmlType="submit" style={{ width: "100%", marginTop: "10px" }} loading={loading} className="primary-btn">
            เข้าสู่ระบบ
          </Button>
          <Button shape="round" style={{ width: "100%", marginTop: "10px" }} className="primary-btn-border" onClick={() => handleRegister()}>
            สมัครสมาชิก
          </Button>
        </Form.Item>
      </Form> */}
    </Modal>
  );
};

export default LoginModal;