import { Button, Form, Input, Modal, notification } from "antd"
import { useState } from "react";
import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { sendRequest } from "@/utils/api";
const Resender = (props: any) => {
  const { openModal, username } = props
  const [current, setCurrent] = useState(0)
  const [code, setCode] = useState("")
  const steps = [
    {
      title: 'First',
      content:
        <div style={{ margin: '1.5vw 0' }}>
          <p style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
            Your account is not active. Click Resend to get code from your gmail !!!
          </p>
          <Input style={{ margin: '1.5vw 0' }} disabled value={username} />
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
      content: 'Last-content',
    },
  ]
  const handleStep0 = async () => {
    setCurrent(current + 1)
    const res = await sendRequest({
      method: 'POST',
      url: 'http://localhost:8080/api/auth/mail',
      body: {
        username: username
      }
    })
  }
  const handleStep1 = async () => {
    setCurrent(current + 1)
    const res = await sendRequest({
      method: 'POST',
      url: 'http://localhost:8080/api/auth/verify',
      body: {
        email: username,
        code: code
      }
    })
  }
  const handleStep2= ()=>{
    props.setOpenModal(false)
    notification.success({
      message:"Active account successfully",
      description:"Please login to using more feature"
    })
    
  }
  return (
    <Modal title="Active your account"
      open={openModal}
      onCancel={() => props.setOpenModal(false)}
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
            <Button type="primary" onClick={()=>handleStep2()}>
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
export default Resender
