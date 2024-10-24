import { auth } from "@/auth";
import AdminContent from "@/component/layout/admin.content";
import AdminFooter from "@/component/layout/admin.footer";
import AdminHeader from "@/component/layout/admin.header";
import AdminSideBar from "@/component/layout/admin.sidebar";
import { Admin } from "@/library/admin.context";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Scrollbar } from 'react-scrollbars-custom';

export default async function DasboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    return (
        <Admin>
            <div style={{ display: 'flex',overflow:'hidden', scrollbarWidth:'none', height:'100vh'}}>
                <div className="left">
                    <AdminSideBar />
                </div>
                <div className="right" style={{ minWidth: "86vw" }}>
                    <AdminHeader
                        session={session}
                    />
                    <div style={{
                        overflow:'scroll',
                        height:'90vh'
                    }}>
                        <AdminContent>
                            {children}
                        </AdminContent>
                    </div>
                    <AdminFooter />
                </div>
            </div>
        </Admin>
    );
}
