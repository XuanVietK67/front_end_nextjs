'use client'

import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ImCancelCircle } from "react-icons/im";
import { Button, Form, Input, Space } from 'antd';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { sendRequest } from '@/utils/api';

type LabelRender = SelectProps['labelRender'];

const options = [
    { label: 'True Answer', value: true },
    { label: 'False Answer', value: false },
];

const labelRender: LabelRender = (props) => {
    const { label, value } = props;

    if (label) {
        console.log("check label: ",label,value)
        return label;
    }
    return <span>Set correct answer</span>;
};
const CreateAnswer = (props: any) => {
    const {accessToken}=props
    const onFinish =async (values: any) => {
        // console.log('Received values of form:', values);
        const res=await sendRequest({
            method:"POST",
            url:"http://localhost:8080/api/question/answer",
            body: {
                answers: values
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log("check res: ",res)
    };
    return (
        <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: '80%' }}
        // layout='vertical'
        >
            <Form.List name="answer">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} align="baseline"
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    border:'1px solid #ccc',
                                    padding:'1.5vw',
                                    marginBottom:'1vh',
                                    borderRadius:'1vw'
                                }}
                            >
                                <Form.Item
                                    {...restField}
                                    name={[name, 'description']}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1vw' }}>
                                        <Input placeholder="Description" style={{ minWidth: '50vw' }} />
                                        <ImCancelCircle
                                            onClick={() => remove(name)}
                                            style={{fontSize:'1.5vw',alignItems:'center',color:'#E63C3C',cursor:'pointer'}}
                                        />
                                    </div>

                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'correctAnswer']}
                                    rules={[{ required: true, message: 'Missing last name' }]}
                                >
                                    <Select labelRender={labelRender} defaultValue='false' style={{ width: '100%' }} options={options} />
                                </Form.Item>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Answer
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default CreateAnswer







