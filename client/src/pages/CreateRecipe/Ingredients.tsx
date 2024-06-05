import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

export function Ingredients() {
    return (
        <Form.Item label="Ingredients">
            <Form.List name="ingredients">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 2 }} align="baseline">
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
                                    rules={[{ required: true, message: 'Missing measurement type' }]}
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
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form.Item>
    );
}
