import { Button, Form, Input, Modal, notification } from "antd"
import { useState } from "react";
import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { sendRequest } from "@/utils/api";
const Forgot = (props: any) => {
    const { forgotPassword } = props
    const [username, setUsername] = useState("")
    const [current, setCurrent] = useState(0)
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const steps = [
        {
            title: 'First',
            content:
                <div style={{ margin: '1.5vw 0' }}>
                    <p style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        Please enter your email to change your password
                    </p>
                    <Input
                        style={{ margin: '1.5vw 0' }}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
        },
        {
            title: 'Second',
            content:
                <div style={{ margin: '1.5vw 0' }}>
                    <p style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Please enter your code</p>
                    <Input style={{ margin: '1.5vw 0' }} value={code} onChange={(event) => setCode(event.target.value)} />
                </div>
        },
        {
            title: 'Last',
            content:
                <Form
                    layout="vertical"
                    style={{
                        marginTop: '2vw'
                    }}
                >
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password value={password} onChange={(event) => setPassword(event.target.value)} />
                    </Form.Item>
                </Form>
        },
    ]
    const handleStep0 = async () => {
        const res = await sendRequest({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/mail',
            body: {
                username: username
            }
        })
        if (!(res as any).error) {
            setCurrent(current + 1)
            notification.success({
                message:'Send email success. Please check your gmail to get your active code',
                description:(res as any).data.message
            })
        }
        else{
            notification.error({
                message:'Send email error',
                description: (res as any).message
            })
        }
    }
    const handleStep1 = async () => {
        // setCurrent(current + 1)
        const res = await sendRequest({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/verify',
            body: {
                email: username,
                code: code
            }
        })
        if(!(res as any).error){
            setCurrent(current+1)
        }
        else{
            console.log(res)
            notification.error({
                message:" Active error",
                description: (res as any).message
            })
        }
    }
    const handleStep2 = async () => {
        const res = await sendRequest({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/forgot',
            body: {
                email: username,
                password: password
            }
        })
        props.setForgotPassword(false)
        notification.success({
            message: "Change password successfully",
            description: "Please login to using more feature"
        })
    }
    const handleCancel=()=>{
        props.setForgotPassword(false)
        setCurrent(0)
        setUsername("")
    }
    return (
        <Modal title="Active your account"
            open={forgotPassword}
            onCancel={() => handleCancel()}
            footer={null}
            maskClosable={false}
        >
            <>
                <Steps
                    items={[
                        {
                            title: 'Login',
                            // status: 'finish',
                            icon: <UserOutlined />,
                        },
                        {
                            title: 'Verification',
                            // status: 'finish',
                            icon: <SolutionOutlined />,
                        },
                        {
                            title: 'Done',
                            // status: 'wait',
                            icon: <SmileOutlined />,
                        },
                    ]}
                    current={current}
                />
                <div >{steps[current].content}</div>
                <div style={{ marginTop: 24 }}>
                    {current === 0 && (
                        <Button type="primary" onClick={() => handleStep0()}>
                            Resend
                        </Button>
                    )}
                    {current === 1 && (
                        <Button type="primary" onClick={() => handleStep1()}>
                            Active
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => handleStep2()}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => setCurrent(current - 1)}>
                            Previous
                        </Button>
                    )}
                </div>
            </>
        </Modal>
    )
}
export default Forgot
