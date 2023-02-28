import React from "react";

interface PropTypes {
    cellContext: any,
}

export const CarrierColumn = ({cellContext}: PropTypes) => {

    return (
        <>
            {cellContext.renderValue()}
        </>
    );
};