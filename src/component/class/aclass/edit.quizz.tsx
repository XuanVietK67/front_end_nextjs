'use client'

import { sendRequest } from "@/utils/api"
import { CloseOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, CheckboxProps, Flex, GetProp, Input, Select, Upload, UploadProps } from "antd";
import React, { useEffect, useState } from 'react';
import { AiFillPlusCircle } from "react-icons/ai";
import { FcAnswers } from "react-icons/fc";
import { HiPlus } from "react-icons/hi2";
import { MdCancel } from "react-icons/md";
import { TbLocationQuestion } from "react-icons/tb";


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface quizz {
    _id: string;
    name: string;
    description: string;
    id: string;
    image: string;
}

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};



const ClientEditQuizz = (props: any) => {
    const { data, accessToken } = props
    const [questions, setQuestions] = useState<Array<any>>([])
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [quizzSelect, setQuizzSelect] = useState()
    const [imageUrl, setImageUrl] = useState<string>();
    const [currentQuizz, setCurrentQuizz] = useState<any>()
    const [quizzId, setQuizzId] = useState("")


    // console.log("check dsta: ",data)

    let OPTIONS = [{}];
    data.forEach((items: any, index: number) => {
        OPTIONS[index] = items
    })

    const filteredOptions = OPTIONS.filter((items) => !selectedItems.includes((items as quizz).name));





    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8, padding: '0' }}>Upload</div>
        </button>
    );


    const handleChangeSelect = async (value: any, label: any) => {
        setQuizzSelect(label)
        setQuizzId(value)
        const quizz = data.filter((items: any) => items._id == value)
        const q = quizz[0].questions
        setCurrentQuizz({ ...quizz[0] })
        setQuestions([...q])
    }

    const handleChangeQuestionDescription = (event: any, index: number) => {
        // console.log("check on change: ",event.target.value,index)
        let contain = questions[index] as any
        let questionCoppy = questions as any
        (contain as any).description = event.target.value
        // console.log("check contain: ",contain)
        questionCoppy[index] = contain
        setQuestions([...questionCoppy])
    }
    const handleChangeAnswerDescription = (event: any, index: number, answerIndex: number) => {
        let contain = questions[index] as any
        let questionsCoppy = questions as any
        (contain as any).answers[+answerIndex].description = event.target.value
        questionsCoppy[index] = contain
        setQuestions([...questionsCoppy])
    }
    const onChange = (e: any, index: number, answerIndex: number) => {
        // console.log(`checked = ${e.target.checked}`, index, answerIndex);
        let contain = questions[index] as any
        let questionsCoppy = questions as any
        (contain as any).answers[+answerIndex].correctAnswer = e.target.checked
        questionsCoppy[index] = contain
        setQuestions([...questionsCoppy])
    };

    const handleAddQuestion = () => {
        const ques = {
            _id: '',
            description: "",
            answers: [{ description: "", correctAnswer: 'false' }]
        }
        setQuestions([...questions, ques])
    }
    const handleAddAnswer = (qIndex: number) => {
        let contain = questions[qIndex] as any
        const answer = {
            description: '',
            correctAnswer: false
        }
        contain.answers = [...contain.answers, answer]
        let questionCoppy = questions as any
        questionCoppy[qIndex] = contain
        setQuestions([...questionCoppy])
    }

    const handleChange: UploadProps['onChange'] = (info) => {
        getBase64(info.file.originFileObj as FileType, (url) => {
            // setLoading(false);
            setImageUrl(url);
        });
    };

    const handleChangeImageQuizz = (event: any) => {
        let quizzCoppy = currentQuizz
        getBase64(event.file.originFileObj as FileType, (url) => {
            quizzCoppy.image = url
            setCurrentQuizz({ ...quizzCoppy })
        });
    }

    const handleChangeQuestionImage = (event: any, index: number) => {
        let questionsCoppy = questions
        let contain = questions[index]
        getBase64(event.file.originFileObj as FileType, (url) => {
            contain.image = url
            questionsCoppy[index] = contain
            setQuestions([...questionsCoppy])
        });
    }

    const handleDeleteQuestion = (index: number) => {
        let questionsCoppy = questions
        questionsCoppy.splice(index,1)
        setQuestions([...questionsCoppy])
    }


    const handleDeleteAnswer=(qIndex: number,answerIndex: number)=>{
        let questionsCoppy=questions
        questionsCoppy[qIndex].answers.splice(answerIndex,1)
        setQuestions([...questionsCoppy])
    }

    console.log("check questions: ", questions)
    // console.log("check current quizz: ",currentQuizz)
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1vh',
                gap: '2vw'
            }}>
                <Select
                    // mode="multiple"
                    placeholder="Choose the quizz which you gonna edit"
                    value={quizzSelect ? quizzSelect : selectedItems}
                    onChange={(value, label) => handleChangeSelect(value, label)}
                    style={{ minWidth: '30vw' }}
                    options={filteredOptions.map((item: any) => ({
                        value: item._id,
                        label: item.name,
                    }))}
                />
                {
                    currentQuizz ?
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            // onChange={handleChange}
                            onChange={(event) => handleChangeImageQuizz(event)}
                            style={{
                                padding: '0'
                            }}
                        >
                            {currentQuizz.image ?
                                <img src={currentQuizz.image} alt="avatar" style={{ width: '100%' }} />
                                :
                                uploadButton}
                        </Upload>
                        :
                        ""
                }
            </div>
            {
                questions && questions.length > 0 &&
                questions.map((items: any, index: number) => {
                    return (
                        <div key={index}>
                            <fieldset style={{
                                border: '1px solid #ccc',
                                borderRadius: '2vw',
                                fontSize: '1.5vw',
                                fontWeight: '200',
                                padding: '2vw',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1vh'
                            }}>
                                <legend>Questions {index + 1}</legend>
                                <div style={{
                                    marginTop: '1vh',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '1vw'
                                }}>
                                    <Input
                                        style={{
                                            maxWidth: '50vw'
                                        }}
                                        value={items?.description}
                                        onChange={(event) => handleChangeQuestionDescription(event, index)}
                                        placeholder="Questions description"
                                    />
                                    <Flex gap="middle" wrap >
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            onChange={(event) => handleChangeQuestionImage(event, index)}
                                            style={{
                                                padding: '0'
                                            }}
                                        >
                                            {items.image ? <img src={items.image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
                                    </Flex>

                                    <span style={{
                                        fontSize: '1.5vw',
                                        color: '#0de7ba',
                                        cursor: 'pointer',

                                    }}>
                                        <Button type='primary' size='large'
                                            onClick={() => handleAddQuestion()}
                                        >
                                            Add Question
                                        </Button>
                                    </span>
                                    <span style={{
                                        fontSize: '1.5vw',
                                        color: '#a50505',
                                        cursor: 'pointer',

                                    }}>
                                        {questions && questions.length > 1 ?
                                            <Button color='danger' variant="solid" size='large' onClick={() => handleDeleteQuestion(index)}>
                                                Delete Questions
                                            </Button>
                                            :
                                            ""
                                        }
                                    </span>
                                </div>
                                {
                                    items.answers && items.answers.length > 0 &&
                                    items.answers.map((answer: any, answerIndex: number) => {
                                        return (
                                            <div style={{
                                                paddingLeft: '2vw',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1vh'
                                            }}
                                                key={`${index}-${answerIndex}`}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '1vh'
                                                }}>
                                                    <Checkbox
                                                        onChange={(event) => onChange(event, index, answerIndex)}
                                                        checked={answer.correctAnswer == "true" ? true : false}
                                                    >
                                                        <Input placeholder="Answer description"
                                                            style={{
                                                                minWidth: '40vw'
                                                            }}
                                                            value={answer.description}
                                                            onChange={(event) => handleChangeAnswerDescription(event, index, answerIndex)}
                                                        />
                                                    </Checkbox>
                                                    < span style={{
                                                        fontSize: '1.5vw',
                                                        color: '#0de7ba',
                                                        cursor: 'pointer',

                                                    }}>
                                                        <Button
                                                            type='primary'
                                                            onClick={() => handleAddAnswer(index)}
                                                            size='small'
                                                        >
                                                            Add Question
                                                        </Button>
                                                    </span >
                                                    <span style={{
                                                        fontSize: '1.5vw',
                                                        color: '#a50505',
                                                        cursor: 'pointer',

                                                    }}>
                                                        {items && items.answers.length > 1 ?
                                                            <Button 
                                                            color='danger' 
                                                            variant="solid" 
                                                            size='small'
                                                            onClick={()=> handleDeleteAnswer(index, answerIndex)}
                                                            >
                                                                Delete Questions
                                                                </Button>
                                                            :
                                                            ""
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </fieldset>
                        </div>
                    )
                })
            }
            <div
                style={{
                    margin: '2vh 0',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                {quizzSelect ? <Button size="large" type='primary'>Update Quizz</Button> : ""}
            </div>
        </div>
    )
}

export default ClientEditQuizz


