import { auth } from "@/auth"
import TableUser from "@/component/user/user.table"
import { sendRequest } from "@/utils/api"

const UserTablePage = async (props: any) => {
    const session = await auth()
    const accessToken=session?.user?.access_token
    const {current,pageSize}=props.searchParams
    const data = await fetch(`http://localhost:8080/api/users?current=${current? current:1}&pageSize=${pageSize? pageSize:3}`, {
        method: 'GET',
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        })
    })
    const res = await data.json()
    // const res = await sendRequest<IBackendRes<any>>({
    //     method: 'GET',
    //     url: 'http://localhost:8080/api/users',
    //     headers: {
    //         Authorization: `Bearer ${session?.user?.access_token}`,
    //     },
    //     nextOption: {
    //         next: { tags: ['list-users'] }
    //     }
    // })
    // console.log("check res: ", res)
    return (
        <TableUser
            data={res}
        />
    )
}

export default UserTablePage