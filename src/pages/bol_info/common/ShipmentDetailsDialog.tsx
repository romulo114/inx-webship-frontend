import React, { useEffect,  useState, useCallback } from "react";
import { MdCancel } from "react-icons/md";
import "../../../assets/sass/components/inputNoBorderStyles.css";
import { TextField } from "components/bol_components/TextField";
import { FaInfoCircle } from "react-icons/fa";
import { getBolDetails, printShipmentSummary } from "../api/bol_api";
import { EMPTY_STRING_VAL } from "../constants/BOLConstants";
import { useDispatch } from "react-redux";
import { CLOSE_SHIPMENT_DETAILS_MODAL } from "actions";

export const ShipmentDetailsDialog = (props: any) => {
  const [bolData, setBolData] = useState({
    shipmentId: '',
    serviceType: "-",
    shipmentDate: "-",
    labelCreationDate: "-",
    tracking: "",
    refNum: ["-"],
    shipperNum: "-",
    purchaseOrderNum: "-",
    packageInfo: [],
    totalUnits: '',
    shipperAddress: null,
    receiverAddress: null,
  });
  useEffect(() => {
    getBolDetails(props.row.original.shipmentId).then((res) => {
      setBolData({
        shipmentId: props.row.original.shipmentId,
        serviceType: `${props.row.original.carrierName}-${props.row.original.serviceType}`,
        shipmentDate: res.data.pickupDate
          ? res.data.pickupDate
          : EMPTY_STRING_VAL,
        labelCreationDate: EMPTY_STRING_VAL,
        tracking: res.data.customerProNumber
          ? res.data.customerProNumber
          : EMPTY_STRING_VAL,
        refNum: res.data.referenceNumbers
          ? res.data.referenceNumbers
          : [EMPTY_STRING_VAL],
        shipperNum: res.data.shipperNumber
          ? res.data.shipperNumber
          : EMPTY_STRING_VAL,
        purchaseOrderNum: res.data.poNumber
          ? res.data.poNumber
          : EMPTY_STRING_VAL,
        packageInfo: res.data.freightItems ? res.data.freightItems : [],
        totalUnits: res.data.totalUnits,
        shipperAddress: res.data.shipperAddress,
        receiverAddress: res.data.consigneeAddress,
      });
    });
  });

  const dispatch = useDispatch();
    const handleDialogClose = useCallback(()=> {
      dispatch({
        type: CLOSE_SHIPMENT_DETAILS_MODAL,
        payload: {
          isShipmentDetailsDialogOpen: false,
        }
      })
    },[dispatch])

  return (
    <div className="text-blue-1">      
      <div
        className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog w-[700px] relative h-[500px]">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-white"
                id="exampleModalLabel"
              >
                VIEW SHIPMENT DETAILS
              </h5>
              <MdCancel
                onClick={handleDialogClose}
                className="text-white bg-green-1 text-5xl cursor-pointer"
              />
            </div>
            <div className="h-[400px] overflow-y-auto">
              
                <div className="modal-body relative border-b-[1px] border-dotted border-gray-400">
                  <div className="grid grid-cols-12">
                    <div className="col-span-6 m-10">
                      <TextField
                        className="m-4"
                        id="serviceType"
                        label="Service Type"
                        name="serviceType"
                        value={bolData.serviceType}
                        disabled={true}
                        ingoreDisabledBack={true}
                        type="text"
                        isValidationTriggered={false}
                      />
                      <TextField
                        className="m-4"
                        id="shipmentDate"
                        label="Shipment Date"
                        name="shipmentDate"
                        value={bolData.shipmentDate}
                        disabled={true}
                        ingoreDisabledBack={true}
                        type="text"
                        isValidationTriggered={false}
                      />
                      <TextField
                        className="m-4"
                        id="labelCreationDate"
                        label="Label Creation Date"
                        name="labelCreationDate"
                        value={bolData.labelCreationDate}
                        type="text"
                        isValidationTriggered={false}
                      />
                      <TextField
                        className="m-4"
                        id="tracking"
                        label="Tracking"
                        name="tracking"
                        value={bolData.labelCreationDate}
                        type="text"
                        isValidationTriggered={false}
                      />
                    </div>

                    <div className="col-span-6 m-10">
                      {bolData.refNum.map(
                        (refNumItem: string, index: number) => (
                          <TextField
                            className="m-4"
                            id={`referenceNum${index}`}
                            label="Reference #"
                            name="referenceNum"
                            value={refNumItem}
                            type="text"
                            isValidationTriggered={false}
                          />
                        )
                      )}
                      <TextField
                        className="m-4"
                        id="shipperNum"
                        label="Shipper #"
                        name="shipperNum"
                        value={bolData.shipperNum}
                        type="text"
                        isValidationTriggered={false}
                      />
                      <TextField
                        className="m-4"
                        id="purchaseOrderNum"
                        label="Purchase Order Number"
                        name="purchaseOrderNum"
                        value={bolData.purchaseOrderNum}
                        type="text"
                        isValidationTriggered={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-blue-1 w-full h-25 justify-start flex">
                  <FaInfoCircle className="text-white" />
                  <label className="text-white uppercase font-bold text-lg pl-2 m-0">
                    PACKAGE INFORMATION
                  </label>
                </div>
                <div>
                  <table className="w-full ml-2 mr-2 mt-10 text-center">
                    <thead className="bg-light-gray">
                      <tr>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Units
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Type
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Haz
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Commodity Description
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Ref#
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          L
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          W
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          H
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Class
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          NMFC
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Weight
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bolData.packageInfo.map((data: any, index: number) => (
                        <tr className={index%2 === 0 ? 'bg-lightest-gray' : 'bg-white'}>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.numberOfUnits}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.packageType}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.hazmat?.toString()}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.commodityDescription
                              ? data.commodityDescription
                              : EMPTY_STRING_VAL}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.reference}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.dimensions.length}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.dimensions.width}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.dimensions.height}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.classCode}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.nmfcCode}
                          </td>
                          <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                            {data.weight}
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td className="bg-light-gray border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Total Units
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">{bolData.totalUnits}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="bg-light-gray border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Total
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400"></td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Total cubic
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400"></td>
                      </tr>
                      <tr>
                        <td className="bg-light-gray border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Total PCF
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400"></td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="w-full ml-2 mr-2 mt-10 text-center">
                    <thead className="bg-light-gray">
                      <tr>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Customs Amt
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Insurance Amt
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          FTR Code
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Terms Of Trade
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Billing Party
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-lightest-gray">
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          -
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          -
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          -
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          -
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          -
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="mt-10 w-full ml-2 mr-2 text-center col-span-12">
                    <thead className="bg-light-gray">
                      <tr>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Shipper Address
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Receiver Address
                        </th>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Quote Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-lightest-gray">
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          {bolData.shipperAddress ? bolData.shipperAddress['companyName'] : ''} <br />
                          {bolData.shipperAddress ? bolData.shipperAddress['contactName'] : ''} <br />
                          {bolData.shipperAddress ? bolData.shipperAddress['address1'] : ''} <br />
                          {bolData.shipperAddress ? bolData.shipperAddress['address2'] : ''} <br />
                          [{bolData.shipperAddress ? bolData.shipperAddress['city'] : ''}] 
                          [{bolData.shipperAddress ? bolData.shipperAddress['postalCode'] : ''}]
                          [{bolData.shipperAddress ? bolData.shipperAddress['stateCode'] : ''}] <br />
                          {bolData.shipperAddress ? bolData.shipperAddress['phoneNumber'] : ''}
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                        {bolData.receiverAddress ? bolData.receiverAddress['companyName'] : ''} <br />
                          {bolData.receiverAddress ? bolData.receiverAddress['contactName'] : ''} <br />
                          {bolData.receiverAddress ? bolData.receiverAddress['address1'] : ''} <br />
                          {bolData.receiverAddress ? bolData.receiverAddress['address2'] : ''} <br />
                          [{bolData.receiverAddress ? bolData.receiverAddress['city'] : ''}]
                          [{bolData.receiverAddress ? bolData.receiverAddress['postalCode'] : ''}]
                          [{bolData.receiverAddress ? bolData.receiverAddress['stateCode'] : ''}] <br />
                          {bolData.receiverAddress ? bolData.receiverAddress['phoneNumber'] : ''}
                        </td>
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Base Charge:
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="mt-10 w-[240px] ml-2 mr-2 text-center">
                    <thead className="bg-light-gray">
                      <tr>
                        <th className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          Notifications Email
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-lightest-gray">
                        <td className="border-[0.5px] border-l-gray-400 border-r-gray-400">
                          -receiverAddress
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
            <div className="flex justify-center gap-10">
              <button
                type="button"
                className="btn btn-primary relative border-solid border-blue-1 border w-32 h-16 justify-center text-center rounded-md text-blue-1 bg-white"
              >
                <div
                  className="w-full justify-center gap-3 flex mt-5"
                  onClick={handleDialogClose}
                >
                  <label className="mb-4 text-lg text-start cursor-pointer">
                    CANCEL
                  </label>
                </div>
              </button>

              <button
                type="button"
                className="btn btn-primary relative w-48 h-16 justify-center text-center border rounded-md text-white bg-blue-1"
                onClick={() => {
                  printShipmentSummary(bolData.shipmentId); 
                  handleDialogClose();
                }}
              >
                <div className="w-full justify-center gap-3 flex mt-5">
                  <label className="mb-4 text-lg relative text-center cursor-pointer">
                    PRINT DETAILS
                  </label>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
