import { auth } from "@/auth"
import ClientDoQuiz from "@/component/class/aclass/class.doquizz"

const DoQuizz =async (props: any) => {
    const {searchParams}=props
    const session= await auth()

    const user=session?.user as any
    const accessToken=user?.access_token 

    const r= await fetch(`http://localhost:8080/api/quizzs/getOne/noCorrectAnswer?_id=${searchParams?._id}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    const quiz=await r.json()
    // let questionsCoppy = quiz.questions
    // questionsCoppy.forEach((q: any) => {
    //     q.answers.forEach((answer: any) => {
    //         answer.correctAnswer = false
    //     })
    // })
    // console.log("check quiz: ",quiz)
    return (
        <ClientDoQuiz 
            accessToken={accessToken}
            quiz={quiz.data}
        />
    )
}
export default DoQuizz