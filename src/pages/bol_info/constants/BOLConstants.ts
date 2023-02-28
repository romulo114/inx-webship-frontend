import { Moment } from "moment";

export const TOKEN = 'Authorization';
interface Map {
    [key: string]: string | number | boolean | object | null;
}

export interface Address extends Map {
    contactName: string;
    companyName: string;
    address1: string;
    address2: string;
    city: string;
    stateCode: string;
    postalCode: string;
    countryCode: string;
    phone: string;
    email: string;
}
export interface ShipperFormValues extends Map {
    shipperAddress: Address;
    shipperReferenceCode: string;
    consigneeAddress: Address;
    consigneeReferenceCode: string;

    shipper_toggle_button: boolean;
    consignee_toggle_button: boolean;
    consignee_addAddressBook_check: boolean;
    shipper_addAddressBook_check: boolean;
}

export interface ShipperRefMainValues extends Map {
    shipperNumber:string;
    poNumber:string;
    specialInstruction: string;
    referenceNumbers:string[];
    
    releaseValue:string;
    // Hazmat Fields
    hazmatClass: string; 
    hazmatType: string; 
    hazmatUN: string; 
    hazmatPackageGroup: string; 
    hazmatPackageType: string;

}

export interface ShipperRefOtherValues extends Map {
    referenceNumbers:string;
}

export interface PackageDimensions extends Map {
    length: string;
    width: string;
    height: string;
}

export interface ShipmentValues extends Map {
    dimensions: PackageDimensions
    weight: string;
    commodityDescription: string;
    nmfcCode: string;
    classCode: string;
    reference: string;
    packageType: string;
    numberOfUnits: string;
    palletized: boolean;
    measurementType: string;
    hazmat: boolean;
}

export interface ShipmentDetailsValues extends Map {
    shipmentDetails: ShipmentValues[],
    description: string
}

export interface MarshInsuranceValues extends Map {
    insurance_premium: string;
    marsh_insurance_toggle_button: boolean;
}
export interface PickUpDetailsValues extends Map {
    pickupDate: string | null;
    pickupReadyTime: string | null;
    pickupCloseTime: string | null;
}
export interface SalesPriceValues extends Map {
    sales_price: string;
}
export interface BOLTypeValues extends Map {
    standard_toggle_button: boolean;
    VICS_insurance_toggle_button: boolean;
}

export interface AdditionalInfoValues extends Map {
    uuid: string;
    billingTypeId: number;
    tariffDescription: string;
    transitTime: number;
    dutyTypeId: number;
    providerQuoteItemId: string;
    carrierName: string;
    providerId: number;
    providerQuoteId: string;
}

export interface AddressBookEntry extends Map {
    addressBookAddressId: number;
    contactName: string;
    companyName: string;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    stateCode: string;
    postalCode: string;
    phone: string;
    email: string;
    countryCode: string;
    department: string;
    fax: string;
    residential: boolean;
}


export const DATE_FORMAT = "mm/dd/yyyy";
export const DATE_DELIMITER = "/";

export interface ErrorObj extends Map {
    show: boolean;
    errorCode: string;
    errorMsg: string;
    contactName: string;
    deptName: string;
    phone: number;
    email: string;
}

export const DISPATCH_REQ_TIMEOUT = 80000; // in milliseconds
export const ERROR_MESSAGES = {
    ERROR_500: {
        errorCode: 500,
        errorMsg:"Server Error - Please contact your customer service representative.",
        contactName: "ABC",
        deptName: "Operations",
        phone: 99999999,
        email: "abc@in.com"
    },
    TIME_OUT: {
        errorCode: "Time Out",
        errorMsg: "Please contact your customer service representative.",
        contactName: "ABC",
        deptName: "Operations",
        phone: 99999999,
        email: "abc@in.com"
    },
    UNEXPECTED: {
        errorCode: "Unexpected error",
        errorMsg: "Please check your shipment details or contact your customer service representative.",
        contactName: "ABC",
        deptName: "Operations",
        phone: 99999999,
        email: "abc@in.com"
    }
}

export const EMPTY_STRING_VAL = "-";

export interface PostalCodeSearchRes extends Map {
    cityName: string;
    countryCode: string;
    countryName: string;
    id: number;
    postalCode: string;
    stateCode: string;
}

export interface QuoteAddress {
    countryCode: string;
    postalCode: string | undefined;
    stateCode: string | undefined;
    city: string | undefined;
}

export interface PrintDimentions extends Map {
    dimensions: PackageDimensions
    weight: string;    
    classCode: string;
    nmfcCode: string;
    packageType: string; 
    commodityDescription: string; 
    numberOfUnits: string;  
}
export interface QuoteObj extends Map {
    carrierName: string;
    tariffDescription: string;
    serviceType: string;
    quoteNumber: string;
    transitTime: string;
    price: string;
}
export interface PrintQuoteObj extends Map {
    quoteId: number;
    quoteGenMoment: Moment;
    origin: QuoteAddress | null;
    destination: QuoteAddress | null;
    items: PrintDimentions[];
    units: number;
    palletized: boolean;
    totalCubic: number;
    totalPcf: number;
    totalWeight: number;
    quotes: QuoteObj[];
}

export interface PrintDispatchDataObj extends Map {
    carrierName: String;
    scacCode: String;
    carrierPhone: String;
    pickupDate: String;
    pickupReadyTime: String;
    pickupCloseTime: String;
    issuedBoLNumber: String;
    freightChangeTerms: String;
    shipperAddress: Address;
    consigneeAddress: Address;
    shipperNumber: String;
    poNumber: String;
    carrierQuote: String;
    billingRefCodeAcfBill: String;
    customer: String;
    referenceNumbers: String[];
    hazmatPackageType: String;
    billingRefCode: String;
    hazmatClass: String;
    hazmatType: String;
    hazmatPackageGroup: String;
    hazmatUN: String;
    specialInstructions: String;
    freightItems: ShipmentValues[];
    initialProNumber: String;
}