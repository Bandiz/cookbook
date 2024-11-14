import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Button, Card, Col, Divider, Form, FormProps, Input, Row, Space } from 'antd';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useGoogleSessionMutation, useLoginSessionMutation } from '../../api/session';
import { LoginRequest } from '../../api/session/types';

export default function Login() {
    const googleSessionMutation = useGoogleSessionMutation();
    const loginSessionMutation = useLoginSessionMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        const params = new URLSearchParams(location.search);
        const returnUrl = params.get('returnTo');
        if (returnUrl) {
            navigate(decodeURIComponent(returnUrl));
        } else {
            navigate('/');
        }
    };

    const handleOnSuccess = (response: CredentialResponse) => {
        if (!response.credential) {
            console.error('No credential found in response');
            return;
        }
        googleSessionMutation.mutate(response.credential, {
            onSuccess: handleLogin,
        });
    };

    const handleOnFailure = () => {
        console.error('Failed to login with Google');
    };

    const onFinish: FormProps<LoginRequest>['onFinish'] = async (values: LoginRequest) => {
        if (!values.username || !values.password) {
            return;
        }

        await loginSessionMutation.mutateAsync(values, {
            onError: (error) => {
                console.log('Error:', error);
            },
            onSuccess: handleLogin,
        });
    };

    const onFinishFailed: FormProps<LoginRequest>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Space direction="vertical" size={20} style={{ marginTop: 100 }}>
            <Row justify="center">
                <Col>
                    <Card size="small" style={{ padding: 20 }}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            style={{ maxWidth: 600 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<LoginRequest>
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<LoginRequest>
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Row justify="center">
                                <Col>
                                    <Form.Item label={null}>
                                        <Button type="primary" htmlType="submit">
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Divider orientation="center">OR</Divider>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Space>
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            <GoogleLogin onSuccess={handleOnSuccess} onError={handleOnFailure} />
                        </GoogleOAuthProvider>
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}
