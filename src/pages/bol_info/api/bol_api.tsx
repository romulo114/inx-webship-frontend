import { SortingState } from "@tanstack/react-table";
import { isEmpty } from "lodash";
import moment from "moment";
import ApiClient, { ApiClientFileDownload } from "utils/apiClient";
import { AddressBookEntry, DISPATCH_REQ_TIMEOUT, PrintQuoteObj } from "../constants/BOLConstants";

export async function userLoggedIn(){
    return await ApiClient.get('userLoggedIn');
}

export async function getAddressBookData(){
    return await ApiClient.get('customer/addressbook')
        .then((response : any) => {
            return response.data;                
        });
}

export async function saveBolInfo(reqObj: any) {
    return await ApiClient.post('freight-shipment', reqObj)
        .then((response: any) => {
            return {
                id: response.id,
                data:response.data
            }
        });
  }
  
  export async function dispatchBolInfo(reqObj: any) {
    return await ApiClient.post('freight-shipment/bol',
        reqObj, {timeout: DISPATCH_REQ_TIMEOUT});
        
  }

  export async function updateAddressBookData(reqObj: AddressBookEntry, id: number) {
    return await ApiClient.put('customer/addressbook/'+id, reqObj);
  }

  export async function getBolDetails(shipmentId: number) {
    return await ApiClient.get('shipment/bol/'+shipmentId);
  }

  export async function updSchedulePickup(shipmentId: number, pickupDetails: any) {
    return await ApiClient.post(`bol/${shipmentId}/schedulepickup`, pickupDetails);
  }

  export async function getTrackingDetails(shipmentId: number) {
    return await ApiClient.get('freight-shipment/tracking/' +shipmentId);
  }

  export async function getPostCodeLookupDetails(postalCode: string) {
    return await ApiClient.get('postcodelookup?postal_code=' + postalCode);
  }
  
  export async function updHotShipment(shipmentId: number, hotShipment: boolean) {
    return await ApiClient.put(`update-hotshipment/${shipmentId}`, {hotShipment: hotShipment});
  }

  export async function exportShipmentSummaries(sorting: SortingState) {
    let url = "shipments?";
    const filename = `Freight_History_${moment().format("yyyy-MMM-DD_HH-mm-ss").toString()}.csv`;
    if(!isEmpty(sorting)){
      const column = sorting[0];
      url += `sortorder=${column.desc ? 'D' : 'A'}&sortfield=${column.id}&`;
    }
    url += `filename=${filename}`;
    return await ApiClientFileDownload.get(url).then(res => {
      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', filename); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
  });
  }

  export async function printQuotes(printQuoteObj: PrintQuoteObj) {
    return await ApiClientFileDownload.post(`freight-quote/pdf`, printQuoteObj).then((res) => {
      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "quoteresults.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  }

  export async function printDispatchDataApi(shipmentId: string) {
    return await ApiClientFileDownload.post(`freight-shipment/bol/generate-dispatched-quote-pdf?shipment_id=${shipmentId}`).then((res) => {

      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.onclick = () => window.open(href, '_blank');

      document.body.appendChild(link);

      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  }

  export async function printLabelApi(shipmentId: string) {
    return await ApiClientFileDownload.get(`freight-quote/print-label?shipment_id=${shipmentId}`).then((res) => {

      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.onclick = () => window.open(href, '_blank');

      document.body.appendChild(link);

      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  }

export async function printShipmentSummary(shipmentId: string) {
  return await ApiClientFileDownload.get(`shipment/print-shipment-summary?shipment_id=${shipmentId}`).then((res) => {
    const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.onclick = () => window.open(href, '_blank');

      document.body.appendChild(link);

      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  }

  

  