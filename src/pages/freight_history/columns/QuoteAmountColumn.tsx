import React from "react";

interface PropTypes {
    cellContext: any,
}

export const QuoteAmountColumn = ({cellContext}: PropTypes) => {

    return (
        <div className="flex justify-center">
            {cellContext.renderValue()}
        </div>
    );
};