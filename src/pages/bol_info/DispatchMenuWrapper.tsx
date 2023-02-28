import { CLOSE_DISPATCH_MENU_DIALOG_MODAL } from "actions";
import { useCallback, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { BOLInfo } from "./BOLInfo";
import { getBolDataByShipmentId } from "./utility/BolDataDispatcher";
interface PropTypes {
  shipmentId: number;
  bolNumber: number;
  proNumber: number;
}

export const DispatchMenuWrapper = ({ shipmentId, bolNumber, proNumber }: PropTypes) => {
  const dispatch = useDispatch();
  const closeDispatchMenuDialog = useCallback(()=> {
    dispatch({
      type: CLOSE_DISPATCH_MENU_DIALOG_MODAL,
      payload: {
        showDispatchMenuDialog: false
      }
    })
  }, [dispatch])
  useEffect(() => {
    getBolDataByShipmentId(shipmentId, dispatch);
  });

  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-[600px] relative">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-white"
              id="exampleModalLabel"
            >
              BOL DETAILS
            </h5>
            <MdCancel
              onClick={closeDispatchMenuDialog}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
            <div className="col-span-12 overflow-y-scroll h-[400px] p-10 pt-0">
              <div className="w-full flex text-blue-1">
                <FaClipboard/><label className="text-xl font-bold">{`BOL NUMBER------${bolNumber}`}</label>
                <FaClipboard className="ml-3"/> <label className="text-xl font-bold">{`PRO NUMBER-------${proNumber}`}</label>
              </div>
              <BOLInfo isBolDetail={true} isBolMenu={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};


