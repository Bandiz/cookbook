import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';

export function Ingredients() {
    return (
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
                                                rules={[{ required: true, message: 'Missing amount' }]}
                                            >
                                                <Input placeholder="1" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ flex: '100%' }} lg={{ flex: '30%' }}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'measurementType']}
                                                label="Measurement type"
                                                rules={[{ required: true, message: 'Missing measurement type' }]}
                                            >
                                                <Input placeholder="liter" type="text" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ flex: '100%' }} lg={{ flex: '35%' }}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'name']}
                                                label="Name"
                                                rules={[{ required: true, message: 'Missing ingredient name' }]}
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
