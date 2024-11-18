import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';

export function Instructions() {
    return (
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
                                        rules={[{ required: true, message: 'Missing description' }]}
                                    >
                                        <Input placeholder="Pour milk into a bowl" type="text" />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ flex: '5%' }}>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Col>
                            </Row>
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
