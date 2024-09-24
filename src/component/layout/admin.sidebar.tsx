'use client'
import { Layout, Menu } from 'antd';
import React, { useContext } from 'react'
import { AlipayOutlined, OrderedListOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { AdminContext } from '@/component/library/admin.context';
const AdminSidebar = () => {
    const status = useContext(AdminContext)
    const { Sider } = Layout;
    const label = ['Dashboard', 'Manage User', 'Navigation One', 'Navigation Two', 'Navigation Three']
    const items = [OrderedListOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined, UserOutlined].map(
        (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: label[+index]
        }),
    );
    const itemss = [
        {
            // icon: React.createElement(AlipayOutlined),
            label: 'Xuan Viet',
        },
        {
            icon: React.createElement(OrderedListOutlined),
            label: 'Dashboard'
        },
        {
            icon: React.createElement(VideoCameraOutlined),
            label: 'Manage User'
        },
        {
            icon: React.createElement(UploadOutlined),
            label: 'Navigation One'
        },
        {
            icon: React.createElement(UserOutlined),
            label: 'Navigation Two'
        },
        {
            icon: React.createElement(UserOutlined),
            label: 'Navigation Two'
        }
    ]
    return (
        <>
            <div className="sidebar-header">
                <AlipayOutlined style={{color: 'powderblue'}}/>
                Xuan Viet
            </div>
            <div className="sidebar-content">
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{ width: '100%' }}
                    collapsed={false}
                >
                    <div className="demo-logo-vertical" />
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['5']} items={items} />
                </Sider>
            </div>
        </>
    )
}
export default AdminSidebar