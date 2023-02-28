import React from "react";

interface PropTypes {
    cellContext: any,
}

export const InsuredAmountColumn = ({cellContext}: PropTypes) => {

    return (
        <>
            {cellContext.renderValue()}
        </>
    );
};