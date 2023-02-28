import React from "react";

interface PropTypes {
    cellContext: any,
}

export const PriceColumn = ({cellContext}: PropTypes) => {
    const price = cellContext.row.original.quoteItem.price
    return (
        <div className="flex justify-center">
            ${price}
        </div>
    );
};