'use client'

import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { sendRequest } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';


interface DataType {
    key: string;
    name: string;
    age: number;
    gmail: string;
    tags: string[];
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },

    {
        title: 'Gmail',
        dataIndex: 'gmail',
        key: 'gmail',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Button>View</Button>
                <Button>Update</Button>
                <Button>Delete</Button>
            </Space>
        ),
    },
];


const TableUser = (props: any) => {
    const { data } = props
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const arr = data.data.result
    const resultt = [{}]
    const [current, setCurrent] = useState(1)
    const [pageSize,setPageSize]=useState(3)
    // const [pageSi]
    arr.forEach((items: any, index: string) => {
        let person = { key: -1, id: (data.data.pageInfo.currentPage - 1) * data.data.pageInfo.pageSize + 1, name: '', gmail: '', tag: [''] }
        person.id = +index + person.id
        person.key = person.id
        person.name = items.name
        person.gmail = items.email
        person.tag = ['developer']
        resultt[+index] = person
    })
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    };
    const handleOnChange=(event : number)=>{
        setCurrent(event)
        router.replace(`${pathname}?current=${event}&pageSize=${pageSize}`)
    }
    return (
        <div>
            <Table<any> columns={columns} dataSource={resultt} pagination={false} />
            <div style={{
                display: 'flex',
                marginTop: '2vh',
                justifyContent: 'end',
                alignItems: 'flex-end'
            }}>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={+data.data.pageInfo.totalItems}
                    // onShowSizeChange={(event)=>PageSizeChange(event)}
                    pageSize={3}
                    onChange={(event) => handleOnChange(event)}
                    // current={current}
                />
            </div>
        </div>
    )
}
export default TableUser






