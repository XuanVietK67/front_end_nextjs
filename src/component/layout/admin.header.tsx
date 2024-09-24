'use client'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState, createContext, useContext } from 'react';
import { AdminContext } from '@/component/library/admin.context';
export const collapsedShare = createContext('false');
const AdminHeader = () => {
    const status=useContext(AdminContext)
    const [collapsed, setCollapsed] = useState(status)
    return (
        <div className="header">
            <Button
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
            />
        </div>
    )
}
export default AdminHeader