import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import {
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Image,
    Input,
    Layout,
    message,
    Row,
    Select,
    Skeleton,
    Space,
    Spin,
} from 'antd';
import { SearchProps } from 'antd/es/input';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useCategoryList from '../../api/admin/category/useCategoryList';
import { useRecipe } from '../../api/admin/recipe/useRecipe';
import { useUpdateRecipe } from '../../api/admin/recipe/useUpdateRecipe';
import { ImageDrawer } from '../../components/Shared/imageDrawer';
import { ADMIN } from '../../constants/routes';
import { Recipe } from '../../types';

export default function EditRecipe() {
    const { recipe } = useParams();
    const { data, isLoading: loading } = useRecipe(recipe ?? '');
    const { data: categories } = useCategoryList();
    const [form] = Form.useForm<Recipe>();
    const { mutate: updateRecipe, isLoading, isError, isSuccess } = useUpdateRecipe();
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        if (isSuccess) {
            message.success('Recipe updated successfully');
        }
        if (isError) {
            message.error('Failed to update recipe, try again later');
        }
    }, [isError, isSuccess]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    if (!categories) {
        return null;
    }
    if (!data || loading) {
        return <Spin size="large" />;
    }
    const recipeData = data.data;

    const onSubmit = (values: Recipe) => {
        values.id = recipeData.id;
        updateRecipe(values);
    };

    const onImageSearch: SearchProps['onSearch'] = (_value, _e, info) => {
        if (info?.source === 'input') {
            showDrawer();
        } else {
            setCurrentImage('');
        }
    };

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
                                <Link className="ant-typography" to={ADMIN + '?activeTab=3'}>
                                    Recipes
                                </Link>
                            ),
                        },
                        {
                            title: `Edit ${recipeData.title}`,
                        },
                    ]}
                />
                <Card>
                    <Form autoComplete="off" layout="vertical" form={form} onFinish={onSubmit}>
                        <Row justify="space-evenly" gutter={[20, 20]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    initialValue={recipeData.title}
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
                                <Row>
                                    <Col xs={{ flex: '100%' }} md={{ flex: '50%' }}>
                                        <Form.Item>
                                            <Form.Item
                                                noStyle
                                                name="isPublished"
                                                valuePropName="checked"
                                                initialValue={recipeData.isPublished}
                                            >
                                                <Checkbox style={{ marginRight: '10px' }} />
                                            </Form.Item>
                                            Is published
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ flex: '100%' }} md={{ flex: '50%' }}>
                                        <Form.Item>
                                            <Form.Item
                                                noStyle
                                                name="isFeatured"
                                                valuePropName="checked"
                                                initialValue={recipeData.isFeatured}
                                            >
                                                <Checkbox style={{ marginRight: '10px' }} />
                                            </Form.Item>
                                            Is featured
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row align="bottom" justify="space-between">
                                    <Col xs={{ flex: '100%' }} md={{ flex: '30%' }}>
                                        <Form.Item
                                            label="Prep Time (min)"
                                            name="prepTimeMinutes"
                                            initialValue={recipeData.prepTimeMinutes}
                                        >
                                            <Input placeholder="10" type="number" min={0} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ flex: '100%' }} md={{ flex: '30%' }}>
                                        <Form.Item
                                            label="Cook Time (min)"
                                            name="cookTimeMinutes"
                                            initialValue={recipeData.cookTimeMinutes}
                                        >
                                            <Input placeholder="10" type="number" min={0} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{ flex: '100%' }} md={{ flex: '30%' }}>
                                        <Form.Item
                                            label="Total Time (min)"
                                            name="totalTimeMinutes"
                                            initialValue={recipeData.totalTimeMinutes}
                                        >
                                            <Input placeholder="10" type="number" min={0} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item label="Categories" name="categories" initialValue={recipeData.categories}>
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
                                                    <Row>
                                                        <Col xs={{ flex: '95%' }}>
                                                            <Row key={key} justify="space-between" align="bottom">
                                                                <Col xs={{ flex: '100%' }} lg={{ flex: '15%' }}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'amount']}
                                                                        label="Amount"
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Missing amount',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input placeholder="1" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col xs={{ flex: '100%' }} lg={{ flex: '30%' }}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'measurementType']}
                                                                        label="Measurement type"
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Missing measurement type',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input placeholder="liter" type="text" />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col xs={{ flex: '100%' }} lg={{ flex: '35%' }}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'name']}
                                                                        label="Name"
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message: 'Missing ingredient name',
                                                                            },
                                                                        ]}
                                                                    >
                                                                        <Input placeholder="milk" type="text" />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={{ flex: '5%' }}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
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
                                                    <Row key={key}>
                                                        <Col xs={{ flex: '95%' }}>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'description']}
                                                                label="Description"
                                                                rules={[
                                                                    { required: true, message: 'Missing description' },
                                                                ]}
                                                            >
                                                                <Input
                                                                    placeholder="Pour milk into a bowl"
                                                                    type="text"
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col xs={{ flex: '5%' }}>
                                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
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
                                <Form.Item label="Main image" name="mainImage" initialValue={recipeData.mainImage}>
                                    <Input.Search
                                        placeholder="664a460f4a6667de0f5dddea"
                                        allowClear
                                        onSearch={onImageSearch}
                                    />
                                </Form.Item>
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
                            </Col>
                        </Row>
                        <ImageDrawer form={form} onClose={onClose} open={open} setCurrentImage={setCurrentImage} />
                    </Form>
                </Card>
            </Layout.Content>
        </Layout>
    );
}
