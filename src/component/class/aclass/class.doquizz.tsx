'use client'

import { Button, Checkbox, CheckboxProps, Input, notification } from "antd"
import { useEffect, useState } from "react"
import '@/component/style/doquiz.scss'
import { useRouter } from "next/navigation"


const ClientDoQuiz = (props: any) => {
    const { accessToken, quiz } = props
    const router = useRouter()


    const [quizz, setQuizz] = useState(quiz)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questions, setQuestions] = useState(quizz.questions)
    const [time, setTime] = useState(1000)


    useEffect(() => {
        if (time === 0) return;
        setTimeout(() => setTime(time - 1), 1000)
    }, [time])

    const handleChooseAnswer = (event: any, index: number) => {
        console.log(event.target.checked, index)
        let coppy = questions
        coppy[currentQuestion].answers[index].correctAnswer = event.target.checked
        setQuestions([...coppy])
    }


    const handleFinishQuiz =async () => {
        // router.replace('/dashboard/classes/aclass/editquizz')
        let result =[""]
        quiz.questions.forEach((items: any, index: number) => {
            let answer = items.answers
            let correct = ""
            answer.forEach((ans: any, answerIndex: number) => {
                if (ans.correctAnswer === true) {
                    correct = correct + answerIndex
                }
            })
            result[index] =correct
        })
        // console.log("check answer: ", result)
        const r= await fetch('http://localhost:8080/api/quizzs/score',{
            method:'POST',
            body: JSON.stringify({
                result,_id: quiz._id
            }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        const res=await r.json()
        if(!res.error){
            notification.success({
                message: 'Your answers have been saved',
                description:`Your score is ${res.data}/${quiz.questions.length}`
            })
            router.replace('/dashboard/classes/aclass/viewquizz')
        }
        console.log("check res finish: ",res)
    }
    return (
        <div className='doquizContainer'>
            <div className='leftContent'>
                <div className='header'>
                    {quiz.name}
                </div>
                <hr />
                <div className="content">
                    <div className='image'>
                        {
                            questions[currentQuestion].image
                                ?
                                <img src={questions[currentQuestion]?.image} />
                                :
                                <div className="img"></div>
                        }
                    </div>
                    <div className='questionDescription'>
                        Question {currentQuestion + 1}: {questions[currentQuestion].description}
                    </div>
                    <div className='answer'>
                        {
                            questions[currentQuestion].answers.length > 0 &&
                            questions[currentQuestion].answers.map((answer: any, index: number) => {
                                return (
                                    <div key={index} className="answerContent">
                                        <Checkbox
                                            onChange={(event) => handleChooseAnswer(event, index)}
                                            checked={answer.correctAnswer}
                                        />
                                        <p>
                                            {answer.description}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='footer'>
                    {
                        currentQuestion > 0 &&
                        <Button size='large' onClick={() => setCurrentQuestion(currentQuestion - 1)}>Prev</Button>
                    }
                    {
                        currentQuestion < questions.length - 1 &&
                        <Button size='large' onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
                    }
                    {
                        currentQuestion === questions.length - 1 &&
                        <Button type='primary' onClick={() => handleFinishQuiz()}>Finish</Button>
                    }
                </div>
            </div>
            <div className='rightContent'>
                <div className='time' onClick={() => handleFinishQuiz()}>
                    <p>
                        {new Date(time * 1000).toISOString().substr(11, 8)}
                    </p>
                    <div>End Exam</div>
                </div>
                <div className='question'>
                    {
                        questions.map((items: any, index: number) => {
                            return (
                                <div key={index}
                                    className='items'
                                    onClick={() => setCurrentQuestion(index)}
                                    style={index === currentQuestion ? { backgroundColor: '#1fb5cb', color: 'white' } : {}}
                                >
                                    {index + 1}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div >
    )
}

export default ClientDoQuiz