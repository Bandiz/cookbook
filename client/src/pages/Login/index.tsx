import { Button, Card, Col, Divider, Form, FormProps, Input, Row, Space } from 'antd';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useGoogleSessionMutation, useLoginSessionMutation } from '../../api/session';

type FieldType = {
    username?: string;
    password?: string;
};

export default function Login() {
    const googleSessionMutation = useGoogleSessionMutation();
    const loginSessionMutation = useLoginSessionMutation();
    const navigate = useNavigate();
    const location = useLocation();

    function handleOnSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if (response.hasOwnProperty('code')) {
            return;
        }
        googleSessionMutation.mutate((response as GoogleLoginResponse).tokenId);
        handleLogin();
    }

    function handleOnFailure(error: unknown) {
        console.log(error);
    }

    function handleLogin() {
        const params = new URLSearchParams(location.search);
        const returnUrl = params.get('returnTo');
        if (returnUrl) {
            navigate(decodeURIComponent(returnUrl));
        } else {
            navigate('/');
        }
    }

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);

        if (!values.username || !values.password) {
            return;
        }
        loginSessionMutation.mutate({
            username: values.username!,
            password: values.password!,
        });
        handleLogin();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
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
                            <Form.Item<FieldType>
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
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
                        <GoogleLogin
                            clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
                            onSuccess={handleOnSuccess}
                            onFailure={handleOnFailure}
                            buttonText="Login with Google"
                        />
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}
