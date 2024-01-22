"use client";
import React from 'react';
import { usePathname } from 'next/navigation'


export type PageProps = {
    params: {
        id: string;
    };
};

const Page: React.FC<PageProps> = ({ params }) => {
    const pathname = usePathname()

    return <p>Current pathname: {pathname}</p>

};

export default Page;
