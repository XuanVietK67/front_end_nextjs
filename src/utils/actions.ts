'use server'
import {InvalidLoginError, signIn} from "@/auth";

export async function authenticate(username: string, password: string) {
    try {
        const r = await signIn("credentials", {
            username: username,
            password: password,
            // callbackUrl: "/",
            redirectTo: '/dashboard',
        })
        return r
    } catch (error) {
        if ((error as any).code==="Email/Password is invalid"){
            return{
                error:(error as any).code,
                code: 1
            }
        }
        else if ((error as any).code==="This account is not active"){
            return{
                error:(error as any).code,
                code: 2
            }
        }
        else{
            return{
                error:(error as any).code,
                code: 0
            }
        }
    }
}