import axios from "axios"
import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { sendRequest } from "@/utils/api"
// Your own logic for dealing with plaintext password strings; be careful!
export class InvalidLoginError extends AuthError {
    code = 'invalid_credentials'
    constructor(message: string) {
        super(message)
        this.code = message
    }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                let res = await sendRequest({
                    method: "POST",
                    url: "http://localhost:8080/api/auth/login",
                    body: {
                        username: credentials.username,
                        password: credentials.password
                    }
                })
                // console.log("check res: ",res)
                if ((res as any).statusCode === 201) {
                    const response = {
                        message: (res as any).message,
                        statusCode: (res as any).statusCode,
                        ... (res as any).data.user,
                        access_token: (res as any).data.access_token
                    }
                    console.log("check response: ", response)
                    
                    return response
                }
                else if ((res as any).statusCode === 401) {
                    throw new InvalidLoginError("Email/Password is invalid")
                }
                else if ((res as any).statusCode === 400) {
                    // notification.open({
                    //     message:'This account is not active'
                    // })
                    throw new InvalidLoginError("This account is not active")
                }
                else{
                    throw new InvalidLoginError("user not found. Please checked your email/password")
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.user = user as any
            }
            return token
        },
        session({ session, token }) {
            (session.user as any) = token.user
            return session
        },
    },
})