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
        return{
            error: (error as any).code
        }
    }
}