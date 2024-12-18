'use client'
import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Divider, Flex, Form, Input, notification, Row, Space } from 'antd';
import { GiReturnArrow } from 'react-icons/gi';
import { signIn } from "next-auth/react"
import Link from 'next/link';
import { authenticate } from '@/utils/actions';
import { useRouter } from 'next/navigation';
import { MdError } from "react-icons/md";
import Resender from './modal.active';
import Forgot from './modal.forgot';
type FieldType = {
    username: string;
    password: string;
    remember?: string;
};
const ClientLoginPage = () => {
    const [isClient, setIsClient] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [username, setUsername] = useState("")
    const [forgotPassword, setForgotPassword] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    if (!isClient) return <></>
    const router = useRouter()
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values
        const res = await authenticate(username, password)
        if ((res as any).error) {
            setUsername(username)
            if ((res as any).code === 2) {
                setOpenModal(true)
                // router.push('/auth/verify')
            }
            else{
                notification.error({
                    message: "Error login",
                    description: res.error,
                    icon: <MdError style={{ color: 'red' }} />
                })
            }
        }
        else {
            notification.success({
                message: "login successfully"
            })
            router.push('/dashboard')
        }
    };


    return (
        <>
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
                                marginTop: '1vh',
                            }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
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
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Button
                                        type="primary" htmlType="submit"
                                    // onClick={()=>onFinish(values)}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type='link'
                                        onClick={()=>setForgotPassword(true)}
                                    >
                                        Forgot Password
                                    </Button>
                                </div>
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
                            You don't have an account?  &nbsp;
                            <Link href="/auth/register"> Register here</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
            <Resender
                openModal={openModal}
                username={username}
                setOpenModal={setOpenModal}
            />
            <Forgot
                forgotPassword={forgotPassword}
                setForgotPassword={setForgotPassword}
            />
        </>
    )
}

export default ClientLoginPage

