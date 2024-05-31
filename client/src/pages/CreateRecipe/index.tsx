import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Checkbox, Col, Form, Input, Layout, Row, Select, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN } from '../../constants/routes';
import { useCategoryList } from '../../api/categories';
import useCreateRecipeMutation from '../../api/recipes/useCreateRecipeMutation';
import { Recipe } from '../../types';
import { useEffect } from 'react';

export default function CreateRecipe() {
    const { data: categories, isError: error } = useCategoryList();
    const [form] = Form.useForm<Partial<Recipe>>();
    const { mutate: createRecipe, isError, isLoading, isSuccess } = useCreateRecipeMutation();

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

    if (!categories) {
        error && message.error('Failed to load categories');
        return null;
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
                                    to={ADMIN + '?activeTab=3'}
                                >
                                    Recipes
                                </Link>
                            ),
                        },
                        {
                            title: 'New Recipe',
                        },
                    ]}
                />
                <Card>
                    <Form autoComplete="off" layout="vertical" form={form} onFinish={onSubmit}>
                        <Row justify="space-evenly" gutter={[20, 20]}>
                            <Col span={12}>
                                <Form.Item label="Title" name="title">
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

                                <Form.Item label="Ingredients">
                                    <Form.List name="ingredients">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Space
                                                        key={key}
                                                        style={{ display: 'flex', marginBottom: 2 }}
                                                        align="baseline"
                                                    >
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'amount']}
                                                            label="Amount"
                                                            rules={[{ required: true, message: 'Missing amount' }]}
                                                        >
                                                            <Input placeholder="1" style={{ width: '100px' }} />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'measurementType']}
                                                            label="Measurement type"
                                                            rules={[
                                                                { required: true, message: 'Missing measurement type' },
                                                            ]}
                                                        >
                                                            <Input placeholder="liter" type="text" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'name']}
                                                            label="Name"
                                                            rules={[
                                                                { required: true, message: 'Missing ingredient name' },
                                                            ]}
                                                        >
                                                            <Input placeholder="milk" type="text" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add field
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>

                                <Form.Item label="Instructions">
                                    <Form.List name="instructions">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Space
                                                        key={key}
                                                        style={{ display: 'flex', marginBottom: 2 }}
                                                        align="baseline"
                                                    >
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'description']}
                                                            label="Description"
                                                            rules={[{ required: true, message: 'Missing description' }]}
                                                        >
                                                            <Input placeholder="Pour milk into a bowl" type="text" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add field
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>

                                <Button type="primary" loading={isLoading} icon={<SaveOutlined />} htmlType="submit">
                                    Save
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Main image" name="mainImage">
                                    <Input placeholder="664a460f4a6667de0f5dddea" />
                                </Form.Item>
                                {/* <Image
                                preview={false}
                                src={`/image/${recipeData.mainImage}`}
                                style={{
                                    maxWidth: 400,
                                }}
                            /> */}
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Layout.Content>
        </Layout>
    );
}
