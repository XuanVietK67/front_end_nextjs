import { auth } from "@/auth"
import ClientLoginPage from "@/component/auth/login"

const LoginPage =async () => {
    const session= await auth()
    // console.log("check session: ",session)
    return (
        <ClientLoginPage/>
    )
}

export default LoginPage