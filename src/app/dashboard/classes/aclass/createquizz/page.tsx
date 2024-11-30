import { auth } from "@/auth"
import CreateQuizz from "@/component/class/aclass/class.update"
import BlankPage from "@/component/layout/blankpage"
import { useActionState } from "react"

const UpdateClass = async () => {
    const session = await auth()
    const user=session?.user as any
    const accessToken=user?.access_token
    console.log("check user: ",user)
    if(user.role=='student'){
        return <BlankPage/>
    }
    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <CreateQuizz 
                accessToken={accessToken}
            />
        </div>
    )
}

export default UpdateClass