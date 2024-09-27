'use client'

import { Layout } from "antd";

const AdminContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { Content } = Layout;
    return (
        <Content>
            <div
                style={{
                    padding: '2.5vw 0 0 4vw',
                    minHeight: 'calc(100vh - 180px)',
                }}
            >
                {children}
            </div>
        </Content>
    )
}

export default AdminContent;