'use client'
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, notification, Select, Upload } from 'antd';
import type { FormProps, GetProp, UploadProps } from 'antd';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';


type FieldType = {
    name?: string;
    description?: string;
    level?: string;
    image?: string;
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const CreateQuizz = (props: any) => {
    const router = useRouter()
    const [level, setLevel] = useState<string>("Easy")
    const {accessToken}=props
    // const handleChangeLevel = (value: string) => {
    // };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        getBase64(info.file.originFileObj as FileType, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const data = { ...values, image: imageUrl }
        const res = await sendRequest({
            url: "http://localhost:8080/api/quizzs",
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        console.log("check res: ",res)
        if (!(res as any).error){
            notification.success({
                message:"Create quizz successfully",
                description:"Go to edit quizz page to manage your quizz"
            })
            router.push('/dashboard/classes/aclass/editquizz')
        }
    };
    return (
        <fieldset style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            width: '50vw',

        }}>
            <legend>Create Quizz</legend>
            <Form
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item<FieldType>
                    label="name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="description"
                    name="description"
                >
                    {/* <TextArea rows={4} /> */}
                    <Input />
                </Form.Item>

                <Form.Item
                    label="level"
                    name="level"
                >
                    <Select
                        // defaultValue="Easy"
                        style={{ width: 200 }}
                        onChange={(values) => setLevel(values)}
                        options={[
                            {
                                label: <span>Level</span>,
                                title: 'level',
                                options: [
                                    { label: <span>Easy</span>, value: 'Easy' },
                                    { label: <span>Medium</span>, value: 'Medium' },
                                    { label: <span>Hard</span>, value: 'Hard' },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="image"
                    name="image"
                >
                    <Flex gap="middle" wrap>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Flex>
                    {/* <Input type='file'> */}
                    {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                    {/* </Input> */}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>

        </fieldset>
    )
}
export default CreateQuizz

