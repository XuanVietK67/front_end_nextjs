'use client'

import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    name?: string;
};

const RegisterPage = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row justify={'center'} style={{ marginTop: '30px' }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>
                        Sign up your account
                    </legend>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Email"
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
        
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                        <Link href={"/"}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                         You already have an account? <Link href={"/auth/register"}>Login here</Link>
                    </div>
                </fieldset>

            </Col>
        </Row>

    )
}
export default RegisterPage