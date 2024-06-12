import { useContext, useState } from 'react'
import './login.sass'
import { loginUser } from '../../services/auth'
import { AuthContext } from "../../context/authContext";
import { Button, Form, Input } from 'antd';

const Login = () => {

    const { setUser } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleLogin = async (values: any) => {
        const res = await loginUser(values);
        if (res && res.data.token) {
            localStorage.setItem("psToken", res.data.token);
            setUser(res.data.user);
        }
    }

  return (
    <div className='login'>
        <div className='login__logo'>
            <h3>LOGO</h3>
        </div>
        <div className="login__form">
            <Form form={form} onFinish={handleLogin}>
                <Form.Item name={'username'}>
                    <Input type="text" placeholder="İstifadəçi adı" />
                </Form.Item>
                <Form.Item name={'password'}>
                    <Input type="password" placeholder="Şifrə" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit'>Daxil ol</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  )
}

export default Login