import { auth } from "@/auth"

const DashboardPage =async () => {
    const session = await auth()
    console.log("check session: ",session)
    return (
        <div>
            Dashboard page
        </div>
    )
}
export default DashboardPage

