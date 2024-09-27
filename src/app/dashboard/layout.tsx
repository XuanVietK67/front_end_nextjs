import AdminContent from "@/component/layout/admin.content";
import AdminFooter from "@/component/layout/admin.footer";
import AdminHeader from "@/component/layout/admin.header";
import AdminSideBar from "@/component/layout/admin.sidebar";
import {Admin} from "@/library/admin.context";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function DasboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Admin>
            <div style={{ display: 'flex' }}>
                <div className="left">
                    <AdminSideBar />
                </div>
                <div className="right" style={{ minWidth: "86vw" }}>
                    <AdminHeader />
                    <AdminContent >
                        {children}
                    </AdminContent>
                    <AdminFooter />
                </div>
            </div>
        </Admin>
    );
}
