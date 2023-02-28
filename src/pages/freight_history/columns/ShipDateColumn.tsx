import React from "react";

interface PropTypes {
    cellContext: any,
}

export const ShipDateColumn = ({cellContext}: PropTypes) => {

    return (
        <>
            {cellContext.renderValue()}
        </>
    );
};