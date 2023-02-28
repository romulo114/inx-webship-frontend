import { FaCalendarPlus, FaCreditCard } from "react-icons/fa";
import { ImInfo } from "react-icons/im";
import { TextField } from "components/bol_components/TextField";
import { TimePicker } from "components/bol_components/TimePicker";
import { Datepicker } from "components/bol_components/DatePicker";
import { ToggleSwitch } from "../../../components/bol_components/ToggleSwitch";
import { BsShieldShaded } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import {
  UPDATE_BOL_TYPE_INFO,
  UPDATE_HIGHLIGHTED_TILL,
  UPDATE_IS_SECTION_VAL_TRIGGERED,
  UPDATE_MARSH_INSURANCE_INFO,
  UPDATE_PICK_UP_DETAILS_INFO,
  UPDATE_SALES_PRICE_INFO,
  UPDATE_SHOW_ADDRESS_CHNG_CONF,
  UPDATE_VALID_SECTIONS,
} from "actions";
import { validateData, valIsAddressDataChanged } from "../utility/Utility";
import { AddressBookEntry, ShipmentValues } from "../constants/BOLConstants";

export const MarshAndOtherDetails = (props: any) => {
  const marshInsuranceObj = useSelector(
    (state: RootState) => state.bolInfoReducer.marshInsuranceObj
  );
  const pickupDetailsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.pickupDetailsObj
  );
  const salesPriceObj = useSelector(
    (state: RootState) => state.bolInfoReducer.salesPriceObj
  );
  const bolTypeObj = useSelector(
    (state: RootState) => state.bolInfoReducer.bolTypeObj
  );
  const shipperConsObj = useSelector(
    (state: RootState) => state.bolInfoReducer.shipperConsObj
  );
  const referenceObj = useSelector(
    (state: RootState) => state.bolInfoReducer.referenceObj
  );
  const isHazmat = useSelector(
    (state: RootState) => state.bolInfoReducer.isHazmat
  );
  const shipmentDetailsWrapper = useSelector(
    (state: RootState) => state.bolInfoReducer.shipmentDetailsWrapper
  );
  const isValidationTriggered = useSelector(
    (state: RootState) => state.bolInfoReducer.isValidationTriggered
  );

  const isSectionValidationTriggered = useSelector(
    (state: RootState) => state.bolInfoReducer.isSectionValidationTriggered
  );

  const selectedShipperId = useSelector(
    (state: RootState) => state.bolInfoReducer.selectedShipperId
  );
  const selectedConsigneeId = useSelector(
    (state: RootState) => state.bolInfoReducer.selectedConsigneeId
  );
  const addressBookData = useSelector(
    (state: RootState) => state.bolInfoReducer.addressBookData
  );

  const dispatch = useDispatch();

  const validateAddressDataSave = () => {
    let isShipperDataChanged = false;
    if (selectedShipperId !== 0) {
      isShipperDataChanged = valIsAddressDataChanged(
        addressBookData.find(
          (item: AddressBookEntry) => item.addressBookAddressId === selectedShipperId
        ),
        shipperConsObj.shipperAddress
      );
      dispatch({
        type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
        payload: isShipperDataChanged
      });
    }
    if (!isShipperDataChanged && selectedConsigneeId !== 0) {
      dispatch({
        type: UPDATE_SHOW_ADDRESS_CHNG_CONF,
        payload: valIsAddressDataChanged(
          addressBookData.find(
            (item: AddressBookEntry) => item.addressBookAddressId === selectedConsigneeId
          ),
          shipperConsObj.consigneeAddress
        ),
      });
    }
  }

  const validatePrevSectionsForMarsh = () => {
    if (!props.isBolDetail || props.isBolMenu) {
      validateAddressDataSave();
      dispatch({
        type: UPDATE_HIGHLIGHTED_TILL,
        payload: 4
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 4
      });
      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: getCommonValidationPayload(),
      });
    }
  };

  const validatePrevSectionsForPickUp = () => {
    if (!props.isBolDetail || props.isBolMenu) {
      validateAddressDataSave();
      dispatch({
        type: UPDATE_HIGHLIGHTED_TILL,
        payload: 5
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 5
      });
      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: getCommonValidationPayload(),
      });
    }
  };

  const validatePrevSectionsForBolTypeSalesPrice = () => {
    if (!props.isBolDetail || props.isBolMenu) {
      validateAddressDataSave();
      dispatch({
        type: UPDATE_HIGHLIGHTED_TILL,
        payload: 6
      });
      dispatch({
        type: UPDATE_IS_SECTION_VAL_TRIGGERED,
        payload: 6
      });
      dispatch({
        type: UPDATE_VALID_SECTIONS,
        payload: [...getCommonValidationPayload(),
        { data: pickupDetailsObj, skipKeys: [] }
        ]
      });
    }
  };

  const getCommonValidationPayload = () => {
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
    return [
      {
        index: 1,
        isValid: validateData([
          {
            data: shipperConsObj,
            skipKeys: ["shipperAddress", "consigneeAddress"],
          },
          { data: shipperConsObj.shipperAddress, skipKeys: ["address2"] },
          { data: shipperConsObj.consigneeAddress, skipKeys: ["address2"] },
        ]),
      },
      {
        index: 2,
        isValid: validateData([
          {
            data: referenceObj,
            skipKeys: [...refSkipKeysNonHazmat, "referenceNumbers"],
          },
          ...referenceObj.referenceNumbers.map((item: string) => ({
            data: { referenceNumber: item },
            skipKeys: [],
          })),
        ]),
      },
      {
        index: 3,
        isValid: validateData([
          ...shipmentDetailsWrapper.shipmentDetails.map(
            (item: ShipmentValues) => ({
              data: {
                commodityDescription: item.commodityDescription,
                reference: item.reference,
              },
              skipKeys: [],
            })
          ),
        ]),
      },
    ];
  };

  return (
    <div className={`md:grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 
    col-span-12 md:col-span-12 sm:col-span-12 bg-white text-blue-1`}>
      <div
        className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7
        border-light-gray mt-10 h-11/12 w-[83vw] md:h-64 md:col-span-1 
        sm:h-11/12 sm:w-11/12 
        ${props.isStep4Valid ? "border-green-1" : "border-light-gray"}`}
        onClick={validatePrevSectionsForMarsh}
      >
        <div className="w-full justify-start flex">
          <BsShieldShaded />
          <label className="text-lg pl-2 font-bold">MARSH INSURANCE</label>
        </div>
        <div className="w-full mt-10 justify-center flex">
          <TextField
            className=""
            id="insurance_premium"
            label="Insurance Premium"
            name="insurance_premium"
            value={
              typeof marshInsuranceObj.insurance_premium == "boolean"
                ? ""
                : marshInsuranceObj.insurance_premium
            }
            onChange={(val: string) =>
              dispatch({
                type: UPDATE_MARSH_INSURANCE_INFO,
                payload: {
                  updKey: "insurance_premium",
                  updValue: val,
                },
              })
            }
            onFocus={() => validatePrevSectionsForMarsh()}
            type="number"
            isValidationTriggered={false}
          />
        </div>
        <div className="w-full mt-5 justify-center flex">
          <ToggleSwitch
            label="Buy"
            value={
              typeof marshInsuranceObj.marsh_insurance_toggle_button ==
                "string" ||
                typeof marshInsuranceObj.marsh_insurance_toggle_button == "number"
                ? false
                : marshInsuranceObj.marsh_insurance_toggle_button
            }
            onChange={(val: boolean) =>
              dispatch({
                type: UPDATE_MARSH_INSURANCE_INFO,
                payload: {
                  updKey: "marsh_insurance_toggle_button",
                  updValue: val,
                },
              })
            }
          />
        </div>
      </div>

      <div
        className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7
          border-light-gray mt-10 h-11/12 w-[83vw] md:w-[96%] md:col-span-2 
          sm:h-11/12 sm:max-w-[44rem]
          ${props.isStep5Valid ? "border-green-1" : "border-light-gray"}`}
        onClick={validatePrevSectionsForPickUp}
      >
        <div className="w-full justify-start flex">
          <FaCalendarPlus />
          <label className="text-lg pl-2 font-bold">PICK UP DETAILS</label>
        </div>
        <div className="w-full justify-start mt-6 flex">
          <Datepicker
            selectedDate={pickupDetailsObj.pickupDate}
            onChange={(date: string) => {
              dispatch({
                type: UPDATE_PICK_UP_DETAILS_INFO,
                payload: {
                  updKey: "pickupDate",
                  updValue: date,
                },
              });
            }}
            isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}
            minDate={true}
          />
        </div>
        <div className="w-full justify-start gap-4 mt-4 flex">
          <TimePicker
            time={pickupDetailsObj.pickupReadyTime}
            label={"Ready Time"}
            onChange={(time: string) => {
              dispatch({
                type: UPDATE_PICK_UP_DETAILS_INFO,
                payload: {
                  updKey: "pickupReadyTime",
                  updValue: time,
                },
              });
            }}
            isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}
          />

          <TimePicker
            time={pickupDetailsObj.pickupCloseTime}
            label={"Close Time"}
            onChange={(time: string) => {
              dispatch({
                type: UPDATE_PICK_UP_DETAILS_INFO,
                payload: {
                  updKey: "pickupCloseTime",
                  updValue: time,
                },
              });
            }}
            isValidationTriggered={isValidationTriggered || isSectionValidationTriggered[4]}
          />
        </div>
      </div>
      <div
        className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7 
        border-light-gray mt-10 h-11/12 w-[83vw]
        ${props.isStep6Valid ? "border-green-1" : ""} 
       
        md:h-64 md:w-[92%] md:col-span-1
        sm:h-11/12 sm:w-11/12 
        `}
        onClick={validatePrevSectionsForBolTypeSalesPrice}
      >
        <div className="w-full justify-start flex">
          <ImInfo />
          <label className="text-lg pl-2 font-bold">BOL TYPE</label>
        </div>
        <div className={`w-full justify-center mt-10 flex
          ${bolTypeObj.standard_toggle_button ? "" : "opacity-50"}`}>
          <ToggleSwitch
            label="Standard"
            value={
              typeof bolTypeObj.standard_toggle_button == "string" ||
                typeof bolTypeObj.standard_toggle_button == "number"
                ? false
                : bolTypeObj.standard_toggle_button
            }
            onChange={(val: boolean) =>
              dispatch({
                type: UPDATE_BOL_TYPE_INFO,
                payload: {
                  updKey: "standard_toggle_button",
                  updValue: val,
                },
              })
            }
          />
        </div>
        <div className={`w-full justify-center mt-4 flex
          ${bolTypeObj.VICS_insurance_toggle_button ? "" : "opacity-50"}`}>
          <ToggleSwitch
            label="VICS"
            value={
              typeof bolTypeObj.VICS_insurance_toggle_button == "string" ||
                typeof bolTypeObj.VICS_insurance_toggle_button == "number"
                ? false
                : bolTypeObj.VICS_insurance_toggle_button
            }
            onChange={(val: boolean) =>
              dispatch({
                type: UPDATE_BOL_TYPE_INFO,
                payload: {
                  updKey: "VICS_insurance_toggle_button",
                  updValue: val,
                },
              })
            }
          />
        </div>
      </div>

      <div
        className={`box border-[1px] rounded-md pt-7 pb-7 pl-7 pr-7
         
          border-light-gray mt-10 h-11/12 md:w-full
          md:h-64 md:col-span-1 sm:h-11/12 sm:max-w-[44rem] w-[83vw]
          ${props.isStep7Valid ? "border-green-1" : "border-light-gray"}`}
        onClick={validatePrevSectionsForBolTypeSalesPrice}
      >
        <div className="w-full justify-start flex">
          <FaCreditCard />

          <label className="text-lg pl-2 font-bold">SALES PRICE</label>
        </div>

        <div className="w-full justify-center flex mt-14">
          <TextField
            className=""
            id="sales_price"
            label="Sales Price"
            name="sales_price"
            value={
              typeof salesPriceObj.sales_price == "boolean"
                ? ""
                : salesPriceObj.sales_price
            }
            onChange={(val: string) =>
              dispatch({
                type: UPDATE_SALES_PRICE_INFO,
                payload: {
                  updKey: "sales_price",
                  updValue: val,
                },
              })
            }
            type="number"
            isValidationTriggered={isValidationTriggered}
          />
        </div>
      </div>
    </div>
  );
};
