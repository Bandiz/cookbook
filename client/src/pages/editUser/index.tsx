import { Breadcrumb, Card, Col, Divider, Layout, Row, Spin, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { UserResponse } from '../../api/user/types';
import { ADMIN } from '../../constants/routes';

export default function EditUser() {
    const { id } = useParams<{ id: string }>();
    const { data: user, isLoading } = useUser(id ?? '');
    const { mutate: updateUser } = useUpdateUserMutation();

    if (!user || isLoading) {
        return <Spin size="large" />;
    }

    return (
        <Layout>
            <Layout.Content style={{ padding: '0 20px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[
                        {
                            title: (
                                <Link className="ant-typography css-dev-only-do-not-override-mzwlov" to={ADMIN}>
                                    Admin
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link
                                    className="ant-typography css-dev-only-do-not-override-mzwlov"
                                    to={ADMIN + '?activeTab=1'}
                                >
                                    Categories
                                </Link>
                            ),
                        },
                        {
                            title: `Edit ${user.userName}`,
                        },
                    ]}
                />
                <Card>
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Typography.Title level={3}>Information</Typography.Title>
                            </Divider>
                            <Row gutter={[20, 20]}>
                                <Col
                                    md={12}
                                    sm={24}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'right',
                                    }}
                                >
                                    <Typography.Text>Username: {user.userName}</Typography.Text>
                                </Col>
                                {/* <Col md={12} sm={24}>
                                    <Checkbox
                                        checked={user.visible}
                                        onChange={(event) => {
                                            updateUser({
                                                categoryName: user.categoryName,
                                                visible: event.target.checked,
                                            });
                                        }}
                                    >
                                        Is visible
                                    </Checkbox>
                                </Col> */}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Typography.Title level={3}>Images</Typography.Title>
                            </Divider>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Typography.Title level={3}>Recipes</Typography.Title>
                            </Divider>
                            {/* <ExpandedRecipeTa`ble category={user} /> */}
                        </Col>
                    </Row>
                </Card>
            </Layout.Content>
        </Layout>
    );
}
function useUser(arg0: string): { data: UserResponse; isLoading: boolean } {
    return {
        data: {
            id: arg0,
            userName: 'mrtest',
            accessFailedCount: 0,
            email: 'test@test.com',
            lastName: 'testington',
            lockoutEnabled: false,
            lockoutEnd: null,
            name: 'test',
            roles: ['admin', 'user'],
        },
        isLoading: false,
    };
}

function useUpdateUserMutation(): { mutate: any } {
    return { mutate: () => {} };
}
