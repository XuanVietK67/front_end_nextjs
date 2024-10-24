import { auth } from "@/auth"
import ClientViewClass from "@/component/class/aclass/class.view"

const ViewClass =async (props: any) => {
    const session=await auth()
    const {searchParams: {current, pageSize}}=props
    const user=session?.user as any
    const accessToken=user?.access_token
    const data= await fetch(`http://localhost:8080/api/quizzs?current=${current? current: '1'}&pageSize=${pageSize? pageSize: '3'}`,{
        method: 'GET',
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: ` Bearer ${accessToken}`,
        })
    })
    const res= await data.json()
    return (
        <ClientViewClass 
            data={res}
        />
    )
}

export default ViewClass