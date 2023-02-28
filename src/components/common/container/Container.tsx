

import React from "react";

type Props = {
    className?: string,
    formClass?:string,
    children: React.ReactNode
}

export const Container = (props: Props) => {
    return (
        <div className="quote__form my-16 px-12">
            <div className={`quote__container bg-white rounded-2xl border-border-gray shadow-scard px-12 py-8 ${props.className ? props.className : ''}`}>
                <div className={`quote__mainForm flex flex-col gap-y-16 ${props.formClass ? props.formClass : ''}`}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}