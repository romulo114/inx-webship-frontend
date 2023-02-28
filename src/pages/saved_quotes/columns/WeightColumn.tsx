import React from "react";

interface PropTypes {
    cellContext: any,
}

export const WeightColumn = ({cellContext}: PropTypes) => {
    const items = cellContext.row.original.quoteRequest.freightItems;
    return (
        <div className="flex justify-center">
            {items[0].weight * 100}kg
        </div>
    );
};