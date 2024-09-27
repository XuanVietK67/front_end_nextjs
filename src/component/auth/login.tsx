'use client'
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Divider, Flex, Form, Input, Row, Space } from 'antd';
import { GiReturnArrow } from 'react-icons/gi';
import Link from 'next/link';
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const ClientLoginPage = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row justify={'center'} style={{ marginTop: '30px' }}>
            <Col xs={24} md={16} lg={8}  >
                <fieldset
                    style={{
                        border: '1px solid #edddfc',
                        borderRadius: '10px',
                        padding: '15px',
                        margin: '5px',
                    }}
                >
                    <legend>Log in your account</legend>
                    <Form
                        name="basic"
                        style={{
                            maxWidth: 600,
                            marginTop:'1vh',
                        }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='vertical'
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

                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>

                        </Form.Item>
                    </Form>
                    <Link href="/"><GiReturnArrow />Return homepage</Link>
                    <Divider />
                    <div
                        style={{
                            display:'flex',
                            justifyContent:'center',
                        }}
                    >
                        You don't have an account?  &nbsp;
                        <Link href="/auth/register"> Register here</Link>
                    </div>
                </fieldset>

            </Col>

        </Row>

    )
}

export default ClientLoginPage
