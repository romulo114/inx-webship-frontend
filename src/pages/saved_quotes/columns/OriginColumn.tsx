import React from "react";

interface PropTypes {
    cellContext: any,
}

export const OriginColumn = ({cellContext}: PropTypes) => {
    const quoteRequest = cellContext.row.original.quoteRequest;
    return (
        <div className="text-ellipsis overflow-hidden break-all max-w-[64px] flex items-center justify-between">
            {quoteRequest.originAddressCode} / {quoteRequest.originState.toUpperCase()} / {quoteRequest.originCity}
        </div>
    );
};