import React from "react";

interface PropTypes {
    cellContext: any,
}

export const QuoteNumberColumn = ({cellContext}: PropTypes) => {
    const QuoteNumber = cellContext.row.original.quoteItem.providerQuoteItemId
    return (
        <div className="flex justify-center">
            {QuoteNumber}
        </div>
    );
};