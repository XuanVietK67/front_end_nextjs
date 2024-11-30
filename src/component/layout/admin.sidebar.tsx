'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import React, { useContext } from 'react';
import type { MenuProps } from 'antd';
import Link from 'next/link'
import { AdminContext } from '@/library/admin.context';
type MenuItem = Required<MenuProps>['items'][number];
const AdminSideBar = (props: any) => {
    const {session}=props
    const role=session?.user?.role
    console.log("check session: ",session)
    const { Sider } = Layout;
    const { collapsed } = useContext(AdminContext)!;
    const adminItems: MenuItem[]=
    [
        {
            key: 'grp',
            label: 'Xuan Viet',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/dashboard/users/table"}>Student Table</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: 'sub1',
                    label: 'Manager Class',
                    icon: <MailOutlined />,
                    children: [
                        {
                            key: 'g1',
                            label: 'Class Action',
                            type: 'group',
                            children: [
                                { key: '1', label: <Link href="/dashboard/classes/aclass/viewquizz"> View Quizz</Link> }, 
                                { key: '2', label: <Link href={"/dashboard/classes/aclass/createquizz"}>Post Quizz</Link> },
                                { key: '3', label: <Link href={"/dashboard/classes/aclass/editquizz"}>Edit Quizz</Link> },
                            ],
                        },
                        {
                            key: 'g2',
                            label: 'Student Action',
                            type: 'group',
                            children: [
                                { key: '4', label: <Link href="/dashboard/classes/astudent/create">Create User</Link> },
                                { key: '5', label: 'Update Student' },
                                { key: '6', label: 'View Student' },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
    const teacherItems: MenuItem[]=
    [
        {
            key: 'grp',
            label: 'Xuan Viet',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/dashboard/users/table"}>Student Table</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: 'sub1',
                    label: 'Manager Class',
                    icon: <MailOutlined />,
                    children: [
                        {
                            key: 'g1',
                            label: 'Class Action',
                            type: 'group',
                            children: [
                                { key: '1', label: <Link href="/dashboard/classes/aclass/viewquizz"> View Quizz</Link> }, 
                                { key: '2', label: <Link href={"/dashboard/classes/aclass/createquizz"}>Post Quizz</Link> },
                                { key: '3', label: <Link href={"/dashboard/classes/aclass/editquizz"}>Edit Quizz</Link> },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
    const studentItems: MenuItem[]=
    [
        {
            key: 'grp',
            label: 'Xuan Viet',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: 'sub1',
                    label: 'Manager Class',
                    icon: <MailOutlined />,
                    children: [
                        {
                            key: 'g1',
                            label: 'Class Action',
                            type: 'group',
                            children: [
                                { key: '1', label: <Link href="/dashboard/classes/aclass/viewquizz"> View Quizz</Link> }, 
                            ],
                        },
                    ],
                },
            ],
        },
    ];
    const items: MenuItem[] = [
        {
            key: 'grp',
            label: 'Xuan Viet',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/dashboard/users/table"}>Student Table</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: 'sub1',
                    label: 'Manager Class',
                    icon: <MailOutlined />,
                    children: [
                        {
                            key: 'g1',
                            label: 'Class Action',
                            type: 'group',
                            children: [
                                { key: '1', label: <Link href="/dashboard/classes/aclass/viewquizz"> View Quizz</Link> }, 
                                { key: '2', label: <Link href={"/dashboard/classes/aclass/createquizz"}>Post Quizz</Link> },
                                { key: '3', label: <Link href={"/dashboard/classes/aclass/editquizz"}>Edit Quizz</Link> },
                            ],
                        },
                        {
                            key: 'g2',
                            label: 'Student Action',
                            type: 'group',
                            children: [
                                { key: '4', label: <Link href="/dashboard/classes/astudent/create">Create User</Link> },
                                { key: '5', label: 'Update Student' },
                                { key: '6', label: 'View Student' },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <Sider
            collapsed={collapsed}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={role=='admin'? adminItems: role=='student'? studentItems: teacherItems}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default AdminSideBar;