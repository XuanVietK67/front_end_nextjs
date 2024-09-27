'use client'

import { Layout } from "antd";

const AdminFooter = () => {
    const { Footer } = Layout;
    return (
        <Footer style={{ textAlign: 'center' }}>
            XuanVietWeb ©{new Date().getFullYear()} Created by @XuanVietDev
        </Footer>
    )
}
export default AdminFooter