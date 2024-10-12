'use client'

import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const { Meta } = Card;
const onChange: PaginationProps['onChange'] = (pageNumber) => {
};

const ClientViewClass = () => {
    return (
        <div style={{   
            display:'flex',
            flexDirection:'column',
            // justifyContent:'space-around',
            gap:'3vh',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <Card
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
                <Card
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
                <Card
                    style={{ width: 300 }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            </div>
            <div style={{
                display:'flex',
                // flexDirection:'column',
                // justifyContent:'right'
                // alignItems:'flex-end',
                justifyContent:'end',
                alignItems:'flex-end'
            }}>
                <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
            </div>
        </div>
    )
}

export default ClientViewClass



