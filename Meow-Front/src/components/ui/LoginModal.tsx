import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Input, Button, message, Typography, Flex } from "antd";
import useNotification from "@/hooks/useNotification";
import useModal from "@/hooks/useModal";
import { login } from "@/services/profileService";
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

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      let user = {
        email: values.email,
        password: values.password,
      }
      setLoading(true);
      const data = await login(user);
      if (data.isSuccess) {
        form.resetFields(); // ล้างค่าฟอร์ม
        message.success("Logged in successfully!");
        localStorage.setItem('_token', data.result.token)
        onLoginSuccess(); // เรียกฟังก์ชันที่ส่งมาจาก Navbar เมื่อ login สำเร็จ
        onCancel(); // ปิด Modal
      } else {
        setErrorMessage(data.message);
      }
    } catch (err: any) {
      modalError({
        title: err?.message,
        content: err?.description,
        onOk: () => { },
        onCancel: () => { },
      });
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = async () => {
    form.resetFields(); // ล้างค่าฟอร์ม
    // router.refresh();
    setErrorMessage(null);
    onCancel(); // ปิด Modal
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

      <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'กรุณาระบุให้ตรงตาม Format Email เมี๊ยว',
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
          rules={[{ required: true, message: "กรุณาระบุ Password เมี๊ยว" }]}
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
          <Button shape="round" style={{ width: "100%", marginTop: "10px" }} className="primary-btn-border">
            สมัครสมาชิก
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;