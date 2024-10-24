'use client'

import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const { Meta } = Card;

const ClientViewClass = (props: any) => {
    const pathname = usePathname()
    const router = useRouter()
    const { data } = props
    const [page, setPage] = useState(1)
    const HandleChangePage = (value: number) => {
        setPage(value)
        router.replace(`${pathname}?current=${value}&pageSize=${data.data.info.pageSize}`)
    }
    const quizzs = data.data.res
    // console.log("check quizzs: ",quizzs)
    const handleSettingQuizz=(id: string)=>{
        console.log("check quizzId: ",id)
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent:'space-around',
            gap: '3vh',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap:'3vw'
            }}>
                {
                    quizzs && quizzs.length > 0 &&
                    quizzs.map((items: any, index: number) => {
                        return (
                            <div key={index}>
                                <Card
                                    style={{ width: 300 }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={items.image? items.image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                                        />
                                    }
                                    actions={[
                                        <SettingOutlined key="setting" 
                                            onClick={()=>handleSettingQuizz(items.id)}
                                        />,
                                        <EditOutlined key="edit" />,
                                        <EllipsisOutlined key="ellipsis" />,
                                    ]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                                        title={items.name}
                                        description={items.description}
                                    />
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'flex-end'
            }}>
                <Pagination
                    current={page}
                    showQuickJumper defaultCurrent={1}
                    total={data.data.info.totalItems}
                    onChange={(value) => HandleChangePage(value)}
                    pageSize={data.data.info.pageSize}
                />
            </div>
        </div>
    )
}

export default ClientViewClass



