'use client'

import { Layout, Menu, theme } from 'antd';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { useContext } from 'react';
import { AdminContext } from '@/library/admin.context';
const AdminHeader = () => {
    const { Header } = Layout;
    const { collapsed, setCollapsed } = useContext(AdminContext)!
    return (
        <Header
            style={{ padding: 0, background: '#ccc', display: 'flex', alignItems: 'center' }}
        >
            {
                collapsed
                    ?
                    <TbLayoutSidebarRightCollapse
                        style={{
                            marginLeft: '1vw',
                            fontSize: '3vw',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    :
                    <TbLayoutSidebarLeftCollapse
                        style={{
                            marginLeft: '1vw',
                            fontSize: '3vw',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    />

            }
        </Header>
    )
}
export default AdminHeader