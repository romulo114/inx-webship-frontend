import React from "react";

interface PropTypes {
    cellContext: any,
}

export const ServiceColumn = ({cellContext}: PropTypes) => {
    const serviceType = cellContext.row.original.quoteItem.serviceType
    return (
        <div className="flex justify-center">
            {serviceType}
        </div>
    );
};