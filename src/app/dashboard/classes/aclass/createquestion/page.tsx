import { auth } from "@/auth"
import CreateQuestion from "@/component/class/aclass/create.question"
import { sendRequest } from "@/utils/api"

const PostQA =async () => {
    const session=await auth()
    const accessToken=session?.user?.access_token
    const res = await sendRequest({
        url: "http://localhost:8080/api/quizzs/all",
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CreateQuestion 
                data={res}
                accessToken={accessToken}
            />
        </div>
    )
}
export default PostQA