'use client'

import { sendRequest } from "@/utils/api";
import { Button, Flex, Form, FormProps, GetProp, Input, notification, Select, Upload, UploadProps } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"


type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    image?: string;
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};


const ClientCreateUser = (props: any) => {
    const router = useRouter()
    const [role, setRole] = useState<string>("Easy")
    const [image,setImage]=useState("")
    const { accessToken } = props
    // const handleChangeLevel = (value: string) => {
    // };
    const [imageUrl, setImageUrl] = useState<string>();


    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleChange: UploadProps['onChange'] = (info) => {
        getBase64(info.file.originFileObj as FileType, (url) => {
            // setLoading(false);
            console.log("check link image: ",url)
            setImageUrl(url);
        });
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        // const data = { ...values, image: imageUrl }
        // const res = await sendRequest({
        //     url: "http://localhost:8080/api/quizzs",
        //     method: "POST",
        //     body: data,
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`
        //     },
        // })
        // console.log("check res: ", res)
        // if (!(res as any).error) {
        //     notification.success({
        //         message: "Create quizz successfully",
        //         description: "Go to edit quizz page to manage your quizz"
        //     })
        //     router.push('/dashboard/classes/aclass/editquizz')
        // }
        console.log("check values: ",values,imageUrl)
    };
    return (
        <fieldset style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            width: '50vw',

        }}>
            <legend>Create User</legend>
            <Form
                layout='vertical'
                onFinish={onFinish}
            // style={{
            //     padding:'0 2vw 0 2vw'
            // }}
            >
                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="role"
                    name="role"
                >
                    <Select
                        // defaultValue="Easy"
                        style={{ width: 200 }}
                        onChange={(values) => setRole(values)}
                        options={[
                            {
                                label: <span>Role</span>,
                                title: 'level',
                                options: [
                                    { label: <span>Teacher</span>, value: 'Teacher' },
                                    { label: <span>Student</span>, value: 'Student' },
                                ],
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Avatar"
                    name="image"
                >
                    <Flex gap="middle" wrap>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            // beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Flex>
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

export default ClientCreateUser