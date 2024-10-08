'use client'

import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, notification, Row, Space } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { sendRequest } from '@/utils/api';
import Link from 'next/link';
import { GiReturnArrow } from 'react-icons/gi';

const VerifyPage = () => {
    const router = useRouter()
    const params = useParams<{ tag: string; id: string }>()
    const [code, setCode] = useState("")
    const handleVerify = async () => {
        const res = await sendRequest({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/verify',
            body: {
                code,
                id: params.id
            }
        })
        if (!(res as any).error) {
            notification.success({
                message: 'Active account successfully',
                description: 'Please login to use more feature'
            })
            router.push(`/auth/login`)
        }
        else {
            notification.error({
                message: 'Error',
                description: (res as any).message
            })
        }
    }
    const handleResendCode= async()=>{
        const res =sendRequest({
            method:'POST',
            url: 'http://localhost:8080/api/auth/mail',
            body:{
                id:params.id,
                code: code
            }

        })
        if(res){
            notification.success({
                message: "Resend Email Success",
                description: 'Your Code sent to your email'
            })
            console.log("check res: ",res)
        }
    }
    return (
        <Row justify={'center'} style={{ paddingTop: '10vh' }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    border: '1px solid #ccc',
                    borderRadius: '1vw'
                }}>
                    <legend>Verify</legend>
                    <Form
                        style={{
                            maxWidth: '50vw',
                            padding: '3vw',
                        }}
                        layout='vertical'
                    >

                        <div style={{
                            fontSize: '2vw',
                            color: 'powderblue'
                        }}>
                            Active your account
                        </div>

                        <Form.Item label="Fill the code here to active your account" name="password" rules={[{ required: true }]}>
                            <Input onChange={(event) => setCode(event.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" onClick={()=>handleVerify()}>
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={()=>handleResendCode()}>
                                    Send Code
                                </Button>
                            </Space>
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



export default VerifyPage;