'use client'

import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import Link from 'next/link';
import { GiReturnArrow } from 'react-icons/gi';

type FieldType = {
    username?: string;
    password?: string;
    email?: string;
};
const ClientRegisterPage = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row justify={'center'}>
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '15px',
                        margin: '5px'
                    }}
                >
                    <legend>Register</legend>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
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
                        <Form.Item<FieldType>
                            label="User Name"
                            name="username"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <Link href="/"><GiReturnArrow />Return homepage</Link>
                    <Divider />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        You have an account return login page &nbsp; <Link href="/auth/login">Login here</Link>
                    </div>
                </fieldset>
            </Col>
        </Row>

    )
}

export default ClientRegisterPage