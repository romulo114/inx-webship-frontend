import React from "react";
import {FaTruck} from 'react-icons/fa'
interface PropTypes {
    cellContext: any,
}

export const TransitTimeColumn = ({cellContext}: PropTypes) => {
    const transitTime = cellContext.row.original.quoteItem.transitTime
    return (
        <div className="flex justify-center items-center">
           <FaTruck /> <span className="ml-2">{transitTime}</span> day{transitTime === '1' ? null : 's'}
        </div>
    );
};