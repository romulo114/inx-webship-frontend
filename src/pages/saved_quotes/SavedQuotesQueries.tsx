import {useMutation, useQuery, useQueryClient} from "react-query";
import {SavedQuotesResponse} from "./SavedQuotesTypes";
import {PaginationState, SortingState} from "@tanstack/react-table";
import apiClient, { ApiClientFileDownload } from "utils/apiClient";
import {isEmpty} from "lodash";
import { IFilterQuery } from "./filter/SavedQuotesFilterTypes";

export function useSavedQuotes(sorting:SortingState, pagination:PaginationState, filterQuery:IFilterQuery) {
    return useQuery<SavedQuotesResponse>(
        ["savedQuotes", sorting, pagination, filterQuery],
        () => fetchSavedQuotes(sorting, pagination, filterQuery),
        { keepPreviousData: true }
    );
}

export const useCarriers = () => useQuery("freight-shipment-carriers", fetchCarriers);
export const useServices = () => useQuery("freight-service-types", fetchServices);
export const useStatus = () => useQuery("freight-shipment-status", fetchStatus);

async function fetchSavedQuotes(sorting:SortingState, pagination:PaginationState, filterQuery:IFilterQuery) {
    const dateFrom = filterQuery.dateFrom.replace(/\//g, '-')
    const dateTo = filterQuery.dateTo.replace(/\//g, '-')

    let url = `freight-quote?page=${pagination.pageIndex + 1 }&pagesize=${pagination.pageSize}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

    if(!isEmpty(sorting)){
        const column = sorting[0];
        url = url + `&sortorder=${column.desc ? 'D' : 'A'}&sortfield=${column.id}`
    }

    if(!isEmpty(filterQuery)){
        const {quoteNumber, receiverName, receiverAddress, carrierName, serviceName, statusName} = filterQuery;

        if (quoteNumber) {
            url = url + `&quote_number=${quoteNumber}`;
        }

        if (receiverName) {
            url = url + `&receiverName=${receiverName}`;
        }

        if (receiverAddress) {
            url = url + `&receiverAddress=${receiverAddress}`;
        }

        if (carrierName?.length) {
            let carriers = '';
            carrierName.forEach((item: any, index:number)=> {
                if (index !== carrierName.length - 1) {
                    carriers += `carriers=${item.value}&`
                } else {
                    carriers += `carriers=${item.value}`
                }
            })
            url = url + '&' + carriers
        }

        if (serviceName?.length) {
            let services = '';
            serviceName.forEach((item: any, index:number)=> {
                if (index !== serviceName.length - 1) {
                    services += `services=${item.value}&`
                } else {
                    services += `services=${item.value}`
                }
            })
            url = url + '&' + services
        }

        if (statusName?.length) {
            let status = '';
            statusName.forEach((item: any, index:number)=> {
                if (index !== statusName.length - 1) {
                    status += `status=${item.value}&`
                } else {
                    status += `status=${item.value}`
                }
            })
            url = url + '&' + status
        }
    }

    return await apiClient.get(url, {data:{}})
        .then((response: any) => {
            return response;
        });
}

export const useDeleteQuote = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteQuote, {
        onSuccess: () => {
            queryClient.invalidateQueries('savedQuotes')
        }
    })
}

const deleteQuote = async (quoteId: number) =>
    await apiClient.delete(`freight-quote/${quoteId}`, {data: {}}).then(response => response.data)

async function fetchCarriers() {
    return await apiClient.get('freight-shipment-carriers', {data:{}}).then((response: any) => {
        return response.data
    })
}

async function fetchServices() {
    return await apiClient.get('freight-service-types', {data:{}}).then((response: any) => {
        return response.data
    })
}

async function fetchStatus() {
    return await apiClient.get('freight-shipment-status', {data:{}}).then((response: any) => {
        return response.data
    })
}

export async function printDocument(quoteId: string) {
    return await ApiClientFileDownload.get(`saved-quote/${quoteId}/pdf`).then((response) => {
        const href = URL.createObjectURL(response.data);
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
