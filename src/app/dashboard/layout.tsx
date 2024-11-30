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
            <div style={{ display: 'flex', height:'100vh',width:'100vw'  }}>
                <div className="left">
                    <AdminSideBar 
                        session={session}
                    />
                </div>
                <div className="right" style={{ minWidth: "86vw" }}>
                    <AdminHeader
                        session={session}
                    />
                    <div style={{
                        height:'80vh'
                    }}>
                        <AdminContent>
                            {children}
                        </AdminContent>
                    </div>
                    {/* <AdminFooter /> */}
                </div>
            </div>
        </Admin>
    );
}
