'use client'

import React from 'react';
import { Layout } from 'antd';
import AdminFooter from '@/component/layout/admin.footer';
import AdminHeader from '@/component/layout/admin.header';
import AdminSidebar from '@/component/layout/admin.sidebar';
import AdminContent from '@/component/layout/admin.content';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { Content } = Layout;
    return (
        <Layout>
            <AdminSidebar />
            <Layout>
                <AdminHeader />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: "#ccc",
                            borderRadius: "#ccc",
                        }}
                    >
                        <AntdRegistry>
                            <AdminContent>
                                {children}
                            </AdminContent>
                        </AntdRegistry>
                    </div>
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    )
}
export default AdminLayout

