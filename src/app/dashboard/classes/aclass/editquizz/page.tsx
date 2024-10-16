import { auth } from "@/auth"
import ClientEditQuizz from "@/component/class/aclass/edit.quizz"
import { sendRequest } from "@/utils/api"

const EditQuizz = async () => {
    const session = await auth()
    const accessToken = session?.user?.access_token
    const res = await sendRequest({
        url: "http://localhost:8080/api/quizzs/all",
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <ClientEditQuizz
                data={res}
                accessToken={accessToken}
            />
        </div>
    )
}
export default EditQuizz