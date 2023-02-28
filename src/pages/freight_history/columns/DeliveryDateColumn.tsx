import React from "react";

interface PropTypes {
    cellContext: any,
}

export const DeliveryDateColumn = ({cellContext}: PropTypes) => {

    return (
        <>
            {cellContext.renderValue()}
        </>
    );
};