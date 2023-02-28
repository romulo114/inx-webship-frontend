import { useCallback } from "react";
import {FaRegEye} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { OPEN_SHIPMENT_DETAILS_MODAL } from "actions";

interface PropTypes {
    setHIndex: Function;
    row: any;
    options: { label: string, is_active: boolean };
}

export const ViewShipmentsMenu = ({setHIndex, row, options}: PropTypes) => {
  const dispatch = useDispatch();
  const openShipmentDetailsDialog = useCallback(()=> {
    dispatch({
      type: OPEN_SHIPMENT_DETAILS_MODAL,
      payload: {
        isShipmentDetailsDialogOpen: true,
        row: row
      }
    })
  }, [dispatch, row])

    return (
      <>
        <div
          onClick={options.is_active ? openShipmentDetailsDialog: ()=>{}}
          className={`border-b border-dashed border-light-gray flex items-center text-blue-1 p-3 font-medium text-sbase transition-all duration-200 border-r ${
            options.is_active
              ? "hover:text-green-1 cursor-pointer"
              : "opacity-20 cursor-default"
          }`}
        >
          <FaRegEye size="1.3em" className="mr-3" />
          {options.label}
        </div>
      </>
    );
};