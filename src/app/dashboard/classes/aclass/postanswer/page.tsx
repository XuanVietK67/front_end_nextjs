import { auth } from "@/auth"
import CreateAnswer from "@/component/class/aclass/create.answer"

const PostAnswer =async () => {
    const session = await auth()
    const accessToken=session?.user?.access_token
    return (
        <div
            style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                // minWidth:'50vw'
            }}
        >
            <CreateAnswer 
            accessToken={accessToken}
            />
        </div>
    )
}
export default PostAnswer