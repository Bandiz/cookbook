import { PictureOutlined, SaveOutlined } from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Flex,
    FloatButton,
    Form,
    Image,
    Input,
    Layout,
    message,
    Row,
    Skeleton,
    Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCreateCategory from '../../api/admin/category/useCreateCategory';
import { ImageDrawer } from '../../components/Shared/imageDrawer';
import { ADMIN } from '../../constants/routes';
import { Category } from '../../types';

export default function CreateCategory() {
    const [form] = Form.useForm<Category>();
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const { mutate: createCategory, isError, isLoading, isSuccess } = useCreateCategory();

    const onSubmit = (values: Category) => {
        createCategory(values);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isSuccess) {
            message.success('Category created successfully');
        }
        if (isError) {
            message.error('Failed to create category, try again later');
        }
    }, [isSuccess, isError]);

    return (
        <Layout>
            <Layout.Content style={{ padding: '0 20px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[
                        {
                            title: (
                                <Link className="ant-typography" to={ADMIN}>
                                    Admin
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link className="ant-typography" to={ADMIN + '?activeTab=2'}>
                                    Categories
                                </Link>
                            ),
                        },
                        {
                            title: 'New Category',
                        },
                    ]}
                />
                <Card>
                    <Form autoComplete="off" layout="vertical" form={form} onFinish={onSubmit}>
                        <Row justify="space-evenly" gutter={[20, 20]}>
                            <Col span={24}>
                                <Form.Item
                                    label="Category Name"
                                    name="categoryName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'First character needs to be capital',
                                            pattern: /^[A-Z][a-z0-9 _-]*\b/,
                                        },
                                    ]}
                                >
                                    <Input placeholder="Breakfast" />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item noStyle name="visible" valuePropName="checked">
                                        <Checkbox style={{ marginRight: '10px' }} />
                                    </Form.Item>
                                    Is visible
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Divider>
                                    <Typography.Title level={3}>Main Image</Typography.Title>
                                </Divider>
                                <Flex justify="center">
                                    {currentImage ? (
                                        <Image
                                            preview={{ src: `/api/image/${currentImage}` }}
                                            src={`/api/image/${currentImage}/preview`}
                                            style={{
                                                maxWidth: 400,
                                            }}
                                        />
                                    ) : (
                                        <Skeleton.Image />
                                    )}
                                </Flex>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Button type="primary" loading={isLoading} icon={<SaveOutlined />} htmlType="submit">
                                    Save
                                </Button>
                            </Col>
                        </Row>

                        <FloatButton
                            type="primary"
                            icon={<PictureOutlined />}
                            onClick={showDrawer}
                            tooltip="Select Image"
                        />
                    </Form>
                </Card>
                <ImageDrawer form={form} onClose={onClose} open={open} setCurrentImage={setCurrentImage} />
            </Layout.Content>
        </Layout>
    );
}
