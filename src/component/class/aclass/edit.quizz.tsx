'use client'

import { Select } from "antd"
import { useState } from "react"

let items=[{value:'',label:''}]

const ClientEditQuizz = (props: any) => {
    const {data}=props
    const quizzs=data.data.res
    const [quizzId,setQuizzId]=useState("")
    let items=[{value:'',label:''}]
    quizzs.forEach((item: any, index: string)=>{
        const contain={value: item.id,label:item.name}
        items=[...items,contain]
    })
    const handleChangeSelect=(value : any)=>{
        // console.log("check value: ",value)
        setQuizzId(value)
    }
    return (
        <Select
            onChange={(value) => handleChangeSelect(value)}
            showSearch
            style={{ width: 500 }}
            placeholder="Select quizz which you want to add question"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={items}
        />
    )
}

export default ClientEditQuizz