'use client'

import { Layout, theme  } from 'antd';
const AdminHeader = () => {
    const { Header} = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Header style={{ padding: 0, background: colorBgContainer }} />
    )
}
export default AdminHeader