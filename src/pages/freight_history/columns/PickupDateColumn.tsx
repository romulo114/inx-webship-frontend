import moment from "moment";
import React, { useState } from "react";
import {ImEye} from "react-icons/im";

interface PropTypes {
    cellContext: any,
}

export const PickupDateColumn = ({cellContext}: PropTypes) => {
    const [pickupDate, setPickupDate] = useState('');
    const handleEyeClick = () => {
        setPickupDate(moment(cellContext.row.original.pickupDateTime).format('YYYY/MM/DD'));;
    };

    return (
        <div className="flex items-center justify-center space-x-1">
        {!pickupDate && (
          <>
            <ImEye size="1.1em" onClick={handleEyeClick} />
            <span>View</span>
          </>
        )}
        {pickupDate && <div>{pickupDate}</div>}
      </div>
    );
};