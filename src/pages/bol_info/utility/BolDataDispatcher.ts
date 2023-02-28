import { UPDATE_ADDITIONAL_INFO, UPDATE_SHIPMENT_DETAILS, UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO, UPDATE_HAZMAT, UPDATE_SEL_SHIPPER_ID, UPDATE_SEL_CONSIGNEE_ID, CLEAR_BOL_DATA, UPDATE_SHIPPER_CONS_ADDRESS_BOOK_INFO, UPDATE_REFERENCE_OBJ, UPDATE_PICK_UP_DETAILS_OBJ, UPDATE_SALES_PRICE_INFO, UPD_BOL_OBJ } from "actions";
import moment from "moment";
import { FilterFormTypes } from "pages/get_pricing/filter_form/FilterFormTypes";
import { getBolDetails } from "../api/bol_api";
import { AddressBookEntry, ShipmentValues } from "../constants/BOLConstants";

export const dispatchPricingData = (data: FilterFormTypes,
  addressBookData: AddressBookEntry[], dispatch: Function) => {
  dispatch({
      type: CLEAR_BOL_DATA
  });

  const selShipperAddressId = data.origin_address_id ? data.origin_address_id : 0;
  const selConsigneeAddressId = data.destination_address_id ? data.destination_address_id : 0;

  dispatchData(data, dispatch);
  if (selShipperAddressId !== 0 || selConsigneeAddressId !== 0) {

    const shipperAddressInfo = addressBookData.find((item: AddressBookEntry) => item.addressBookAddressId === selShipperAddressId);
    if (shipperAddressInfo) {
      dispatch({
        type: UPDATE_SEL_SHIPPER_ID,
        payload: selShipperAddressId
      });
      dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "shipperAddress",
          data: createAddressDataObj(shipperAddressInfo)
        },
      });
    }
    const consigneeeAddressInfo = addressBookData.find((item: AddressBookEntry) => item.addressBookAddressId === selConsigneeAddressId);
    if (consigneeeAddressInfo) {
      dispatch({
        type: UPDATE_SEL_CONSIGNEE_ID,
        payload: selConsigneeAddressId
      });
      dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "consigneeAddress",
          data: createAddressDataObj(consigneeeAddressInfo)
        },
      });
    }   

  }
}

const createAddressDataObj = (addressInfo: any) => {
  return {
    companyName: addressInfo.companyName,
    email: addressInfo.email,
    address1: addressInfo.address1,
    address2: addressInfo.address2,
    contactName: addressInfo.contactName,
    phone: addressInfo.phone.toString().replace(/ /g, '')
  }
}

export const dispatchData = (data: FilterFormTypes, dispatch: Function) => {
    dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "shipperAddress",
          data: {
            city: data.origin_city,
            stateCode: data.origin_state,
            postalCode: data.origin_post_code,
            countryCode: data.origin_country.code,
            address1: data.origin_address1 ? data.origin_address1 : '',
            address2: data.origin_address2 ? data.origin_address2 : '',
            companyName: data.origin_companyName ? data.origin_companyName : '',
            contactName: data.origin_contactName ? data.origin_contactName : '',
            email: data.origin_email ? data.origin_email : '',
            phone: data.origin_phone ? data.origin_phone : ''
          }
        }
      });
      dispatch({
        type: UPDATE_SHIPPER_CONS_ADDRESS_MUL_INFO,
        payload: {
          shipperConsKey: "consigneeAddress",
          data: {
            city: data.destination_city,
            stateCode: data.destination_state,
            postalCode: data.destination_post_code,
            countryCode: data.destination_country.code,
            address1: data.destination_address1 ? data.destination_address1 : '',
            address2: data.destination_address2 ? data.destination_address2 : '',
            companyName: data.destination_companyName ? data.destination_companyName : '',
            contactName: data.destination_contactName ? data.destination_contactName : '',
            email: data.destination_email ? data.destination_email : '',
            phone: data.destination_phone ? data.destination_phone : ''
          }
        }
      });
      
      dispatch({
        type: UPDATE_SHIPMENT_DETAILS,
        payload: data.load_information?.map((loadInfo: any) => {
          return {
            dimensions: {
              length: loadInfo.dimension_length,
              width: loadInfo.dimension_width,
              height: loadInfo.dimension_height
            },
            weight: loadInfo.weight,
            commodityDescription: loadInfo.commodity.label,
            nmfcCode: loadInfo.commodity_nmfc,
            classCode: loadInfo.class.label,
            reference: "",
            packageType: loadInfo.type.label,
            numberOfUnits: loadInfo.units,
            palletized: loadInfo.is_palletized,
            measurementType: loadInfo.weight_unit.value === "Lbs" ? "IMPERIAL" : "METRIC",
            hazmat: loadInfo.is_hazmat
          }
        })     
      })
      let isHazmat = false;
      for (let i = 0; data.load_information && i<data.load_information.length; i++) {
        if (data.load_information[i].is_hazmat)  {
          isHazmat = true;
          break;
        }
      }
      dispatch({
        type: UPDATE_HAZMAT,
        payload: isHazmat
      });
}

export const dispatchAdditionalInfoData =
  (data: any, dispatch: Function) => {
    dispatch({
      type: UPDATE_ADDITIONAL_INFO,
      payload: data
    })
}

export const getBolDataByShipmentId = (shipmentId: number, dispatch: Function) => {
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
        referenceNumbers: res.data.referenceNumbers ? res.data.referenceNumbers : [""],
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
}