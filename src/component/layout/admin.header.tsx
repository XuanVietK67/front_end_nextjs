'use client'

import { Button, Layout, Menu, MenuProps, MenuTheme, theme } from 'antd';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { useContext, useState } from 'react';
import { AdminContext } from '@/library/admin.context';
import { CgProfile } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react"

type MenuItem = Required<MenuProps>['items'][number];

const AdminHeader = (props : any) => {
    const {session}=props
    const items: MenuItem[] = [
        {
            key: '1',
            icon: <CgProfile style={{fontSize:'2vw', color:'powderblue'}}/>,
            label: <div style={{display:'flex',alignItems:'center', fontSize:'1.5vw', color:'powderblue'}}>{session?.user?.email}</div>,
            children: [
                { key: '11', label: <div style={{fontSize:'1vw'}} >Profile</div> },
                { key: '12', label: <div style={{fontSize:'1vw'}} onClick={()=>signOut()}>Log out</div> },
            ],
        },
    ]
    const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
    const [theme, setTheme] = useState<MenuTheme>('light');
    const { Header } = Layout;
    const { collapsed, setCollapsed } = useContext(AdminContext)!

    return (
        <Header
            style={{
                padding: 0,
                background: '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
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
            <Menu
                style={{
                    width: 350,
                    height: '7vh',
                    borderRadius: '5px',
                    display:'flex',
                    justifyContent:'center',
                }}
                defaultSelectedKeys={['1']}
                mode={mode}
                items={items}
            />
        </Header>
    )
}
export default AdminHeader