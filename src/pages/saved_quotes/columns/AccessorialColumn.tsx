import React from "react";

interface PropTypes {
    cellContext: any,
}

export const AccessorialColumn = ({cellContext}: PropTypes) => {
    const accessorialsCnt = cellContext.row.original.quoteRequest.accessorials.length
    return (
        <div className="flex justify-center">
            {accessorialsCnt} accessorial
        </div>
    );
};