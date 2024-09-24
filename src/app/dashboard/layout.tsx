'use client'

import React from 'react';
import { Layout } from 'antd';
import AdminFooter from '@/component/layout/admin.footer';
import AdminHeader from '@/component/layout/admin.header';
import AdminSidebar from '@/component/layout/admin.sidebar';
import AdminContent from '@/component/layout/admin.content';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/app/dashboard/layout.scss'
const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { Content } = Layout;
    return (
        <div className="dashboard-container">
            <div className="left">
                <AdminSidebar />
            </div>
            <div className="right">
                <div className="header">
                    <AdminHeader />
                </div>
                <div className="content">
                    <AdminContent>
                        {children}
                    </AdminContent>
                </div>
                <div className="footer">
                    <AdminFooter />
                </div>
            </div>
        </div>
    )
}
export default AdminLayout

