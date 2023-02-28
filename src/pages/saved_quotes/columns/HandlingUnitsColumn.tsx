import React from "react";

interface PropTypes {
    cellContext: any,
}

export const HandlingUnitsColumn = ({cellContext}: PropTypes) => {
    const pallet = cellContext.row.original.palletCount
    return (
        <div className="flex justify-center">
            {pallet}
        </div>
    );
};