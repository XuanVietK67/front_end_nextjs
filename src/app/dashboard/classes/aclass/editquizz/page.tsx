import { auth } from "@/auth"
import ClientEditQuizz from "@/component/class/aclass/edit.quizz"
import { sendRequest } from "@/utils/api"

const EditQuizz = async () => {
    const session = await auth()
    const user=session?.user as any
    const accessToken = user.access_token
    const res = await sendRequest({
        url: "http://localhost:8080/api/quizzs/all",
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    return (
        <ClientEditQuizz
            data={(res as any).data.res}
            accessToken={accessToken}
        />
    )
}
export default EditQuizz