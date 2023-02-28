import React from "react";
import {RiSendPlaneFill} from "react-icons/ri";

interface PropTypes {
    setHIndex: Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const SendDocumentsMenu = ({setHIndex, row, options}: PropTypes) => {

    return (
        <div
            className={`border-b border-dashed border-light-gray flex items-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 ${options.is_active ? 'hover:text-green-1 cursor-pointer' : 'opacity-20 cursor-default'}`}
        >
            <RiSendPlaneFill size='1.3em' className="mr-3"/>
            {options.label}
        </div>
    );
};