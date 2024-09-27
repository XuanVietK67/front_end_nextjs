'use client'

import { createContext, useState } from "react";
interface IAdminContext{
    collapsed: boolean;
    setCollapsed: (v:boolean)=>void;
}

export const AdminContext=createContext<IAdminContext|null>(null)

export const Admin=({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    const [collapsed,setCollapsed]=useState(false)
    return(
        <AdminContext.Provider value={{collapsed,setCollapsed}}>
            {children}
        </AdminContext.Provider>
    )
}