'use client'
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, message, notification, Select, Upload } from 'antd';
import type { FormProps, GetProp, UploadProps } from 'antd';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';


type FieldType = {
    quizzId?: string;
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

const CreateQuestion = (props: any) => {
    const { data, accessToken } = props
    const quizzs=data.data.res
    // console.log("check quizzs: ",quizzs)
    let items=[{value:'',label:''}]
    quizzs.forEach((item: any, index: string)=>{
        const contain={value: item.id,label:item.name}
        items=[...items,contain]
    })
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [quizzId,setQuizzId]=useState("")
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
        const data={...values,image:imageUrl}
        // console.log("check values: ",data)
        const res=await sendRequest({
            method:"POST",
            url: "http://localhost:8080/api/question",
            body:data,
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log("check res: ",res)
        if(!(res as any).error){
            notification.success({
                message: 'Create question successfully',
                description: 'Please add some answers to question.'
            })
            router.replace(`/dashboard/classes/aclass/postanswer?quizzId=${(res as any).data.res.quizzId}&questionId=${(res as any).data.res.questionId}`)
        }
    };
    const handleChangeSelect=(value : any)=>{
        // console.log("check value: ",value)
        setQuizzId(value)
    }
    return (
        <fieldset style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            width: '50vw',

        }}>
            <legend>Create Question</legend>
            <Form
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item<FieldType>
                    label="Quizz's name"
                    name="quizzId"
                >
                    <Select
                        onChange={(value)=>handleChangeSelect(value)}
                        showSearch
                        style={{ width: 500 }}
                        placeholder="Select quizz which you want to add question"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={items}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="description"
                    name="description"
                >
                    {/* <TextArea rows={4} /> */}
                    <Input />
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
export default CreateQuestion
