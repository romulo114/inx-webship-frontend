import React from "react";

interface PropTypes {
    cellContext: any,
}

export const CarrierColumn = ({cellContext}: PropTypes) => {
    const carrierName = cellContext.row.original.quoteItem.carrierName
    return (
        <>
            {carrierName}
        </>
    );
};