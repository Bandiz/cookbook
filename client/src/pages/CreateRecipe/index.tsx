import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Layout, Row, Select, Space, Typography } from 'antd';
import form from 'antd/es/form';
import { Link } from 'react-router-dom';
import { ADMIN } from '../../constants/routes';
import { Store } from 'antd/es/form/interface';
import { useCategoryList } from '../../api/categories';
import useCreateRecipeMutation from '../../api/recipes/useCreateRecipeMutation';
import { Recipe } from '../../types';

export default function CreateRecipe() {
    const { data: categories } = useCategoryList();
    const [form] = Form.useForm<Partial<Recipe>>();
    const { mutate: createRecipe } = useCreateRecipeMutation();

    const onSubmit = (values: Partial<Recipe>) => {
        createRecipe(values);
    };

    if (!categories) {
        return null;
    }

    return (
        <Layout>
            <Layout.Header style={{ background: 'light' }}>
                <Typography.Title level={1} style={{ color: 'white' }}>
                    New recipe
                </Typography.Title>
            </Layout.Header>
            <Link className="ant-typography css-dev-only-do-not-override-mzwlov" to={ADMIN}>
                Go back
            </Link>
            <Layout.Content style={{ padding: '0 20px' }}>
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
                                        return (
                                            <Select.Option key={category.categoryName} value={category.categoryName}>
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
                                                        rules={[{ required: true, message: 'Missing ingredient name' }]}
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

                            <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
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
            </Layout.Content>
        </Layout>
    );
}
