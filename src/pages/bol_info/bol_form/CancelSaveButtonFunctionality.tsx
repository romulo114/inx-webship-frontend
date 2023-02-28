import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { saveBolInfo } from "../api/bol_api";
import moment from "moment";
import { CLEAR_BOL_DATA } from "actions";

export const CancelSave = (props: any) => {
  const {
    shipperConsObj,
    referenceObj,
    shipmentDetailsWrapper,
    pickupDetailsObj,
    salesPriceObj,
    additionalInfoObj
  } = useSelector((state: RootState) => state.bolInfoReducer);

  const dispatch = useDispatch();

  const updateBolData = () => {
    saveBolInfo(getReqObjForSave()).then(() => {
      dispatch({
        type: CLEAR_BOL_DATA
      })
      props.closeBolDialog();
    });
  };

  const cancelBolData = () => {
    props.closeBolDialog();
  }

  const getReqObjForSave = () => {
    return {
      id: props.shipmentId,
      poNumber: referenceObj.poNumber,
      shipperNumber: referenceObj.shipperNumber,
      shipperReferenceCode: shipperConsObj.shipperReferenceCode,
      shipperAddress: { ...shipperConsObj.shipperAddress, residential: false },
      consigneeReferenceCode: shipperConsObj.consigneeReferenceCode,
      consigneeAddress: {
        ...shipperConsObj.consigneeAddress,
        residential: false,
      },
      freightItems: shipmentDetailsWrapper.shipmentDetails,
      pickupDate: moment
        .utc(pickupDetailsObj.pickupDate, "MM/DD/yyyy")
        .format(),
      pickupReadyTime: moment
        .utc(
          `${pickupDetailsObj.pickupDate} ${pickupDetailsObj.pickupReadyTime}`,
          "MM/DD/yyyy h:mm A"
        )
        .format(),
      pickupCloseTime: moment
        .utc(
          `${pickupDetailsObj.pickupDate} ${pickupDetailsObj.pickupCloseTime}`,
          "MM/DD/yyyy h:mm A"
        )
        .format(),
      releaseValue: referenceObj.releaseValue,
      sendBolToSender: shipperConsObj.shipper_toggle_button,
      sendBolToReceiver: shipperConsObj.consignee_toggle_button,
      sendLabelToSender: shipperConsObj.shipper_toggle_button,
      sendLabelToReceiver: shipperConsObj.consignee_toggle_button,
      specialInstructions: referenceObj.specialInstruction,
      referenceNumbers: referenceObj.referenceNumbers,
      price: salesPriceObj.sales_price,
      hazmatClass: referenceObj.hazmatClass,
      hazmatType: referenceObj.hazmatType,
      hazmatUN: referenceObj.hazmatUN,
      hazmatPackageGroup: referenceObj.hazmatPackageGroup,
      hazmatPackageType: referenceObj.hazmatPackageType,


      uuid: additionalInfoObj.uuid,
      billingTypeId: additionalInfoObj.billingTypeId,
      tariffDescription: additionalInfoObj.tariffDescription,
      transitTime: additionalInfoObj.transitTime,
      dutyTypeId: additionalInfoObj.dutyTypeId,
      providerQuoteItemId: additionalInfoObj.providerQuoteItemId,
      providerQuoteId: additionalInfoObj.providerQuoteId,
      carrierName: additionalInfoObj.carrierName,
      serviceType: additionalInfoObj.serviceType,
      providerId: additionalInfoObj.providerId,
    };
  };

  return (
    <main>
      <div className="w-full justify-center flex gap-16 mt-20">
        <button
          type="button"
          className="btn btn-primary relative border-solid border-blue-1 border w-40 h-16 justify-center text-center rounded-md text-blue-1 bg-white"
        >
          <div
            className="w-full justify-center gap-3 flex mt-5"
            onClick={cancelBolData}
          >
            <label className="mb-4 text-lg text-start cursor-pointer">
              CANCEL
            </label>
          </div>
        </button>

        <button
          type="button"
          className="btn btn-primary relative w-48 h-16 justify-center text-center border rounded-md text-white bg-blue-1"
        >
          <div
            className="w-full justify-center gap-3 flex mt-5"
            onClick={updateBolData}
          >
            <label className="mb-4 text-lg relative text-center cursor-pointer">
              SAVE BOL
            </label>
          </div>
        </button>
      </div>
    </main>
  );
};
