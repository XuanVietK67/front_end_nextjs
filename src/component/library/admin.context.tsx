import { createContext, useState } from 'react';

// interface IAdminContext{
//     collasedSidebar: boolean;
//     setCollasedSidebar: (status: boolean)=> void;
// }
export const AdminContext=createContext(false);

export const AdminContextProvider=({
    children,
}: Readonly<{
    children: React.ReactNode;
}>)=>{
    const [collased, setCollased]=useState(false)
    return(
        <AdminContext.Provider value={collased}>
            {children}
        </AdminContext.Provider>
    )
}