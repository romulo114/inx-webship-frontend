import { CLOSE_BOL_DETAIL_MODAL, UPDATE_HAZMAT, UPDATE_PICK_UP_DETAILS_OBJ, UPDATE_REFERENCE_OBJ, UPDATE_SALES_PRICE_INFO, UPDATE_SHIPMENT_DETAILS, UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO, UPD_BOL_OBJ } from "actions";
import moment from "moment";
import { useEffect, useCallback } from "react";
import { FaClipboard } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getBolDetails } from "./api/bol_api";
import { CancelSave } from "./bol_form/CancelSaveButtonFunctionality";
import { MarshAndOtherDetails } from "./bol_form/MarshAndOtherDetails";
import { ReferenceInfoWrapper } from "./bol_form/ReferenceInfoWrapper";
import ShipperForm from "./bol_form/ShipperForm";
import { ShippmentDetails } from "./bol_form/ShippmentDetails";
import { ShipmentValues } from "./constants/BOLConstants";
interface PropTypes {
  shipmentId: number;
  bolNumber: number;
  proNumber: number;
}

export const BOLDetails = ({ shipmentId, bolNumber, proNumber }: PropTypes) => {
  const dispatch = useDispatch();
  const closeBolDetailModal = useCallback(()=> {
    dispatch({
      type: CLOSE_BOL_DETAIL_MODAL,
      payload: {
        showInfoBol: false
      }
    })
  }, [dispatch])
  useEffect(() => {
    getBolDetails(shipmentId).then(res => {
      dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO,
        payload: {
          shipperAddress: res.data.shipperAddress,
          shipperReferenceCode: res.data.shipperReferenceCode,
          shipper_toggle_button: res.data.sendBolToSender,
          consigneeAddress: res.data.consigneeAddress,
          consigneeReferenceCode: res.data.consigneeReferenceCode,
          consignee_toggle_button: res.data.sendBolToReceiver
        }
      });

      let isHazmat = false;
      for (let i = 0; res.data.freightItems && i<res.data.freightItems.length; i++) {
        if (res.data.freightItems[i].hazmat)  {
          isHazmat = true;
          break;
        }
      }
      dispatch({
        type: UPDATE_HAZMAT,
        payload: isHazmat
      });
      dispatch({
        type: UPDATE_REFERENCE_OBJ,
        payload: {
          shipperNumber: res.data.shipperNumber,
          poNumber: res.data.poNumber,
          specialInstruction: res.data.specialInstructions,
          referenceNumbers: res.data.referenceNumbers ? res.data.referenceNumbers : [],
          releaseValue: res.data.releaseValue,
          hazmatClass: res.data.hazmatClass, 
          hazmatType: res.data.hazmatType, 
          hazmatUN: res.data.hazmatUN, 
          hazmatPackageGroup: res.data.hazmatPackageGroup, 
          hazmatPackageType: res.data.hazmatPackageType,
        }
      });
      
      dispatch({
        type: UPDATE_SHIPMENT_DETAILS,
        payload: res.data.freightItems?.map((loadInfo: ShipmentValues) => {
          return {
            dimensions: loadInfo.dimensions,
            weight: loadInfo.weight,
            commodityDescription: loadInfo.commodityDescription, 
            nmfcCode: loadInfo.nmfcCode,
            classCode: loadInfo.classCode,
            reference: loadInfo.reference,
            packageType: loadInfo.packageType,
            numberOfUnits: loadInfo.numberOfUnits,
            palletized: loadInfo.palletized,
            measurementType: loadInfo.measurementType === "Lbs" ? "IMPERIAL" : "METRIC",
            hazmat: loadInfo.hazmat
          }
        })     
      });

      dispatch({
        type: UPDATE_PICK_UP_DETAILS_OBJ,
        payload: {
          pickupDate: res.data.pickupDate ? moment(res.data.pickupDate).format('MM/DD/yyyy') : null,
          pickupReadyTime: res.data.pickupReadyTime,
          pickupCloseTime: res.data.pickupCloseTime
        }
      });

      dispatch({
        type: UPDATE_SALES_PRICE_INFO,
        payload: {
          updKey: 'sales_price',
          updValue: res.data.price
        }
      });

      dispatch({
        type: UPD_BOL_OBJ,
        payload: {
          shipperAddressId: res.data.shipperAddress.shipmentAddressId,
          consigneeAddressId: res.data.consigneeAddress.shipmentAddressId
        }
      });

    });
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
              onClick={closeBolDetailModal}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
            <div className="col-span-12 overflow-y-scroll h-[400px] p-10 pt-0">
              <div className="w-full flex">
              <FaClipboard/><label className="text-xl font-bold">{`BOL NUMBER------${bolNumber}`}</label>
              <FaClipboard className="ml-3"/> <label className="text-xl font-bold">{`PRO NUMBER-------${proNumber}`}</label>
              </div>
              <ShipperForm isBolDetail={true} />
              <ReferenceInfoWrapper isBolDetail={true} />
              <ShippmentDetails isBolDetail={true} />
              <MarshAndOtherDetails isBolDetail={true} />
              <CancelSave shipmentId={shipmentId} closeBolDialog={closeBolDetailModal} />
          </div>
        </div>
      </div>
    </div>
  );
};


