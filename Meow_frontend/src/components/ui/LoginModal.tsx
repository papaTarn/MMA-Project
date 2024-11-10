import React from "react";
import { Modal, Form, Input, Button, message } from "antd";

interface LoginModalProps {
  visible: boolean;
  onCancel: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onCancel, onLoginSuccess }) => {
  const handleLogin = (values: { username: string; password: string }) => {
    // สมมติว่า login สำเร็จ
    message.success("Logged in successfully!");
    onLoginSuccess(); // เรียกฟังก์ชันที่ส่งมาจาก Navbar เมื่อ login สำเร็จ
  };

  return (
    <Modal title="Login" visible={visible} onCancel={onCancel} footer={null}>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;