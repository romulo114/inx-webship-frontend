import React from "react";

interface PropTypes {
    cellContext: any,
}

export const SenderColumn = ({cellContext}: PropTypes) => {

    return (
        <div
            className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[64px]"
        >
            {cellContext.renderValue()}
        </div>
    );
};