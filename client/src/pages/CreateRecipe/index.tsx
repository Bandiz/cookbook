import { PictureOutlined, SaveOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    Layout,
    Row,
    Select,
    Skeleton,
    Typography,
    message,
    Image,
    FloatButton,
} from 'antd';
import { useCategoryList } from '../../api/categories';
import useCreateRecipeMutation from '../../api/recipes/useCreateRecipeMutation';
import { Recipe } from '../../types';
import { useEffect, useState } from 'react';
import { ImageDrawer } from '../../components/Shared/imageDrawer';
import { Breadcrumbs } from './Breadcrumbs';
import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';

export default function CreateRecipe() {
    const { data: categories, isError: categoryListError } = useCategoryList();
    const [form] = Form.useForm<Partial<Recipe>>();
    const { mutate: createRecipe, isError, isLoading, isSuccess } = useCreateRecipeMutation();
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        if (isSuccess) {
            message.success('Recipe created successfully');
        }
        if (isError) {
            message.error('Failed to create recipe, try again later');
        }
    }, [isSuccess, isError]);

    const onSubmit = (values: Partial<Recipe>) => {
        createRecipe(values);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    if (!categories) {
        categoryListError && message.error('Failed to load categories');
        return null;
    }

    return (
        <Layout>
            <Layout.Content style={{ padding: '0 20px' }}>
                <Breadcrumbs />
                <Card>
                    <Form autoComplete="off" layout="vertical" form={form} onFinish={onSubmit}>
                        <Row justify="space-evenly" gutter={[20, 20]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'First character needs to be capital',
                                            pattern: /^[A-Z][a-z0-9 _-]*\b/,
                                        },
                                    ]}
                                >
                                    <Input placeholder="Pancakes" />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item noStyle name="isPublished" valuePropName="checked">
                                        <Checkbox style={{ marginRight: '10px' }} />
                                    </Form.Item>
                                    Is published
                                </Form.Item>

                                <Row gutter={[20, 20]} justify="space-evenly">
                                    <Col span={8}>
                                        <Form.Item label="Prep Time (min)" name="prepTimeMinutes">
                                            <Input placeholder="10" type="number" min={0} style={{ width: '100px' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Cook Time (min)" name="cookTimeMinutes">
                                            <Input placeholder="10" type="number" min={0} style={{ width: '100px' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Total Time (min)" name="totalTimeMinutes">
                                            <Input placeholder="10" type="number" min={0} style={{ width: '100px' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item label="Categories" name="categories">
                                    <Select allowClear mode="multiple" placeholder="Breakfast, Dinner">
                                        {categories.map((category) => {
                                            if (!category || !category.visible) {
                                                return null;
                                            }
                                            return (
                                                <Select.Option
                                                    key={category.categoryName}
                                                    value={category.categoryName}
                                                >
                                                    {category.categoryName}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Description" name="description">
                                    <Input.TextArea placeholder="..." />
                                </Form.Item>

                                <Ingredients />

                                <Instructions />

                                <Button type="primary" loading={isLoading} icon={<SaveOutlined />} htmlType="submit">
                                    Save
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Row justify="end">
                                    <ImageDrawer
                                        form={form}
                                        onClose={onClose}
                                        open={open}
                                        setCurrentImage={setCurrentImage}
                                    />
                                </Row>
                                <Typography.Title level={5}>Image Preview</Typography.Title>
                                <Form.Item label="Main image" name="mainImage">
                                    <Input placeholder="664a460f4a6667de0f5dddea" />
                                </Form.Item>
                                {currentImage ? (
                                    <Image
                                        preview={false}
                                        src={`/api/image/${currentImage}`}
                                        style={{
                                            maxWidth: 400,
                                        }}
                                    />
                                ) : (
                                    <Skeleton.Image />
                                )}
                            </Col>
                        </Row>
                    </Form>
                    <FloatButton
                        type="primary"
                        icon={<PictureOutlined />}
                        onClick={showDrawer}
                        tooltip="Select Image"
                    />
                </Card>
            </Layout.Content>
        </Layout>
    );
}
