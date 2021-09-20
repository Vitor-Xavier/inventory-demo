import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Login } from '../login';
import loginService from '../services/login.service';
import { message } from 'antd';

const setToken = (userToken: string) => {
    sessionStorage.setItem('token', userToken);
}

export default function LoginForm(props: any) {
    const [login, setLogin] = useState<Login>({ username: '', password: '', remember: false });
    const [redirectTo, setRedirectTo] = useState<string | null>(null);
    const history = useHistory();

    useEffect(() => {
        setRedirectTo(history.location.pathname);
        history.replace('/login');
    }, [history]);

    const onFinish = async (values: Login) => {
        try {
            const result = await loginService.authenticate(values);
            setToken(result.data.token);
            props.setToken(result.data.token);

            const route = redirectTo === '/login' ? '/' : redirectTo ?? '/';
            props.onRedirect(route);
            history.push(route);
        } catch (e) {
            message.error('Erro ao logar usuário');
        }
    };

    return (
        <Form
            initialValues={{
                remember: true,
            }}
            onFinish={() => onFinish(login)}
        >
            <Row justify="center">
                <Col span={6}>
                    <Form.Item name="username">
                        <Input value={login.username} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuário" onChange={(value) => setLogin({ ...login, username: value.target.value })} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={6}>
                    <Form.Item name="password">
                        <Input
                            value={login.password}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Senha"
                            onChange={(value) => setLogin({ ...login, password: value.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={6}>
                    <Form.Item>
                        <Form.Item name="remember" noStyle>
                            <Checkbox checked={login.remember} onChange={(value => setLogin({ ...login, remember: value.target.checked }))}>Lembrar</Checkbox>
                        </Form.Item>
                        <a style={{ float: 'right' }} href="/forgot-password">
                            Esqueceu a senha?
                        </a>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={6}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Entrar
                        </Button>
                        <br />
                        Ou <a href="/create-account">Registrar</a>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}