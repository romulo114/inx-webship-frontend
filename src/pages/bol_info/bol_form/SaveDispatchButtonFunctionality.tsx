import { IoMdSave } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { dispatchBolInfo, printDispatchDataApi, printLabelApi, saveBolInfo } from "../api/bol_api";
import moment from "moment";
import { DispatchShipment } from "../common/DispatchShipmentOrder";
import { useState } from "react";
import { checkValidObject, valIsAddressDataChanged } from "../utility/Utility";
import { AddressBookEntry, ERROR_MESSAGES, ShipmentValues } from "../constants/BOLConstants";
import { CLEAR_BOL_DATA, UPDATE_IS_VALIDATION_TRIGGERED, UPDATE_SHOW_ADDRESS_CHNG_CONF, UPD_ERR_OBJ } from "actions";
import { useNavigate } from "react-router-dom";
import { Overlay } from "../common/AddressBookDialog";
import { DispatchedOrderConfirmationDialog } from "../common/DispatchedOrderConfirmationDialog";

export const SaveDispatch = (props: any) => {
  const {
    shipperConsObj,
    referenceObj,
    shipmentDetailsWrapper,
    pickupDetailsObj,
    salesPriceObj,
    additionalInfoObj,
    isHazmat,
    selectedShipperId,
    selectedConsigneeId,
    addressBookData,
    isShipperConsInfoChanged
  } = useSelector((state: RootState) => state.bolInfoReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dispatchedBol, setDispatchedBol] = useState({
    shipmentId: "",
    issuedBoLNumber: "",
    initialProNumber: "",
  });
  const [openDispatchDialog, setOpenDispatchDialog] = useState(false);
  const [openDispatchConfDialog, setDispatchConfDialog] = useState(false);

  const validateAddressDataSave = () => {
    let isDataChanged = false;
    if (selectedShipperId !== 0) {
      isDataChanged = valIsAddressDataChanged(
        addressBookData.find(
          (item: AddressBookEntry) => item.addressBookAddressId === selectedShipperId
        ),
        shipperConsObj.shipperAddress
      );
      dispatch({
        type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
        payload: isDataChanged
      });
    }

    if (!isDataChanged && selectedConsigneeId !== 0) {
      isDataChanged = valIsAddressDataChanged(
        addressBookData.find(
          (item: AddressBookEntry) => item.addressBookAddressId === selectedConsigneeId
        ),
        shipperConsObj.consigneeAddress
      );
      dispatch({
        type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
        payload: isDataChanged
      });
    }
    return isDataChanged;
  }

  const saveBolData = () => {
    if (!(isShipperConsInfoChanged && validateAddressDataSave())) {
      saveBolInfo(getReqObjForSave()).then(() => {
        dispatch({
          type: CLEAR_BOL_DATA
        })
        navigate("/freight_history");
      });
    }
  };

  const dispatchBolData = () => {
    dispatchBolInfo({
      ...getReqObjForSave(),
      saveShipperAddress: shipperConsObj.shipper_addAddressBook_check,
      saveConsigneeAddress: shipperConsObj.consignee_addAddressBook_check,
    }).then((res: any) => {      
      printLabel(res.data.id);
      setDispatchedBol({
        shipmentId: res.data.id,
        issuedBoLNumber: res.data.issuedBoL.providerBolNumber,
        initialProNumber: res.data.initialProNumber,
      });     
      setDispatchConfDialog(true);
    }).catch(error => {
      if (error.code === 'ECONNABORTED') {
          dispatch({
              type: UPD_ERR_OBJ,
              payload: {
                  show: true,
                  ...ERROR_MESSAGES.TIME_OUT
              }   
          })
      } else if (error.response && error.response.status === 500) {
          dispatch({
              type: UPD_ERR_OBJ,
              payload: {
                  show: true,
                  ...ERROR_MESSAGES.ERROR_500
              }
          })
      } else {
          dispatch({
              type: UPD_ERR_OBJ,
              payload: {
                  show: true,
                  ...ERROR_MESSAGES.UNEXPECTED
              }
          })
      }
    });
    setOpenDispatchDialog(false);    
  };

  const validateData = (dataObjArr: any[]) => {
    let isValid = true;
    for (let i = 0; i < dataObjArr.length; i++) {
      isValid = checkValidObject(dataObjArr[i].data, dataObjArr[i].skipKeys);
      if (!isValid) {
        break;
      }
    }
    return isValid;
  };

  const validateBeforeDispatch = () => {
    if (!(isShipperConsInfoChanged && validateAddressDataSave())) {
      let refSkipKeysNonHazmat: string[] = [];
      if (!isHazmat) {
        refSkipKeysNonHazmat = [
          "hazmatClass",
          "hazmatType",
          "hazmatUN",
          "hazmatPackageGroup",
          "hazmatPackageType",
          "specialInstruction",
        ];
      }

      const shipperConsSkipKeysList = ["address2", "address3", "addressBookAddressId",
        "countryCode", "department", "fax", "residential", "salutation"];
      const isValid = validateData([
        {
          data: shipperConsObj,
          skipKeys: ["shipperAddress", "consigneeAddress"],
        },
        { data: shipperConsObj.shipperAddress, skipKeys: shipperConsSkipKeysList },
        { data: shipperConsObj.consigneeAddress, skipKeys: shipperConsSkipKeysList },
        {
          data: referenceObj,
          skipKeys: [...refSkipKeysNonHazmat, "referenceNumbers"],
        },
        ...referenceObj.referenceNumbers.map((item: string) => ({
          data: { referenceNumber: item },
          skipKeys: [],
        })),
        ...shipmentDetailsWrapper.shipmentDetails.map((item: ShipmentValues) => ({
          data: { commodityDescription: item.commodityDescription, reference: item.reference },
          skipKeys: [],
        })),
        { data: pickupDetailsObj, skipKeys: [] },
      ]);

      if (isValid) {
        dispatch({
          type: UPDATE_IS_VALIDATION_TRIGGERED,
          payload: false,
        });
        setOpenDispatchDialog(true);
      } else {
        dispatch({
          type: UPDATE_IS_VALIDATION_TRIGGERED,
          payload: true,
        });
      }
    }
  };

  const getReqObjForSave = () => {
    return {
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
          "MM/DD/yyyy h:mm A").format(),
      pickupCloseTime: moment
        .utc(
          `${pickupDetailsObj.pickupDate} ${pickupDetailsObj.pickupCloseTime}`,
          "MM/DD/yyyy h:mm A").format(),
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


  const printLabel = (shipmentId: any) => {
    if (shipperConsObj.shipper_toggle_button || shipperConsObj.consignee_toggle_button) {
      printLabelApi(shipmentId);
    }
  };


  return (
    <main>
      <div className="w-full justify-center flex gap-16 mt-20">
        {openDispatchDialog ? (
          <>
            <Overlay />
            <DispatchShipment
              onDispatchClicked={dispatchBolData}
              onDialogClose={() => setOpenDispatchDialog(false)}
            />
          </>
        ) : (
          <></>
        )}

        {openDispatchConfDialog ? (
          <>
            <Overlay />
            <DispatchedOrderConfirmationDialog
              onViewBol={() => {
                  dispatch({
                    type: CLEAR_BOL_DATA
                  });
                  setDispatchConfDialog(false);
                  printDispatchDataApi(dispatchedBol.shipmentId);
                  navigate("/freight_history");
                }
              }
              onDialogClose={() => setDispatchConfDialog(false)}
            />
          </>
        ) : (
          <></>
        )}

        <button
          type="button"
          className="btn btn-primary relative border-solid border-blue-1 border w-40 h-16 justify-center text-center rounded-md text-blue-1 bg-white"
        >
          <div
            className="w-full justify-center gap-3 flex mt-5"
            onClick={saveBolData}
          >
            <label className="mb-4 text-lg text-start cursor-pointer">
              SAVE
            </label>
            <IoMdSave className="justify-items-end cursor-pointer" />
          </div>
        </button>
        <button
          type="button"
          className="btn btn-primary relative w-48 h-16 justify-center text-center border rounded-md text-white bg-green-1"
        >
          <div
            className="w-full justify-center gap-3 flex mt-5"
            onClick={validateBeforeDispatch}
          >
            <label className="mb-4 text-lg relative text-center cursor-pointer">
              DISPATCH
            </label>
            <BsBoxSeam className="relative text-center cursor-pointer" />
          </div>
        </button>
      </div>
    </main>
  );
};
