import { auth } from "@/auth";
import AdminContent from "@/component/layout/admin.content";
import AdminFooter from "@/component/layout/admin.footer";
import AdminHeader from "@/component/layout/admin.header";
import AdminSideBar from "@/component/layout/admin.sidebar";
import { Admin } from "@/library/admin.context";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default async function DasboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    return (
        <Admin>
            <div style={{ display: 'flex' }}>
                <div className="left">
                    <AdminSideBar />
                </div>
                <div className="right" style={{ minWidth: "86vw" }}>
                    <AdminHeader 
                        session={session}
                    />
                    <AdminContent >
                        {children}
                    </AdminContent>
                    <AdminFooter />
                </div>
            </div>
        </Admin>
    );
}
