import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// Define the type for the form values
interface FormValues {
  userName?: string;
  villageName?: string;
  committeeName?: string;
  emailId: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState<boolean>(true);
//   const navigate = useNavigate();

  const handleRegister = async (values: FormValues) => {
    try {
      await axios.post('http://localhost:6001/api/auth/register', values);
      notification.success({ message: 'Signup successful!' });
      form.resetFields();
    } catch (error) {
      notification.error({ message: 'Signup failed!' });
    }
  };

  const handleLogin = async (values: FormValues) => {
    try {
      const response = await axios.post('http://localhost:6001/api/auth/login', values);
      if (response.data.status) {
        notification.success({ message: 'Login successful!' });
        form.resetFields();
        localStorage.setItem('isAuth', 'true');
        // navigate('/navpage/image');
      } else {
        localStorage.setItem('isAuth', 'false');
        notification.error({ message: response.data.message });
      }
    } catch (error) {
      localStorage.setItem('isAuth', 'false');
      notification.error({ message: 'Login failed!' });
    }
  };

  return (
    <div className="login-container">
      <style>{`
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: grey; 
        }
        .login-container {
          max-width: 400px;
           padding: 30px;
          border: 10px solid #d9d9d9;
          border-radius: 14px;
          background: linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: black;
        }
        .ant-form-item {
          margin-bottom: 16px;
        }
        .ant-btn-primary {
          width: 100%;
          background-color: blue;
          border-color: yellow;
        }
        .ant-btn-primary:hover {
          background-color: #45a049; 
          border-color: #45a049;
        }
        .toggle-link {
          text-align: center;
          margin-top: 10px;
          color: Blue; 
        }
        .toggle-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <Form form={form} onFinish={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="villageName"
              rules={[{ required: true, message: 'Please enter your village name!' }]}
            >
              <Input placeholder="Village Name" />
            </Form.Item>

            <Form.Item
              name="committeeName"
              rules={[{ required: true, message: 'Please enter your committee name!' }]}
            >
              <Input placeholder="Committee Name" />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="emailId"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isLogin ? 'Login' : 'Signup'}
          </Button>
        </Form.Item>
      </Form>

      <Button type="link" className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </Button>
    </div>
  );
};

export default Login;
