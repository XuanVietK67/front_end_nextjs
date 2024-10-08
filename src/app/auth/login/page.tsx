import { auth } from "@/auth"
import ClientLoginPage from "@/component/auth/login"

const LoginPage =async () => {
    const session= await auth()
    return (
        <ClientLoginPage/>
    )
}

export default LoginPage