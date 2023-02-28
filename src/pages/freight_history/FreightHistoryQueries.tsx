import {useMutation, useQuery, useQueryClient} from "react-query";
import {ShipmentResponse} from "./FreightHistoryTypes";
import {PaginationState, SortingState} from "@tanstack/react-table";
import apiClient from "utils/apiClient";
import {isEmpty} from "lodash";
import { IFilterQuery } from './filter/FreightHistoryFilterTypes';

export function useShipments(sorting:SortingState, pagination:PaginationState, filterQuery:IFilterQuery) {
    return useQuery<ShipmentResponse>(
        ["shipments", sorting, pagination, filterQuery],
        () => fetchShipments(sorting, pagination, filterQuery),
        { keepPreviousData: true }
    );
}

export const useCarriers = () => useQuery("freight-shipment-carriers", fetchCarriers);
export const useServices = () => useQuery("freight-service-types", fetchServices);
export const useStatus = () => useQuery("freight-shipment-status", fetchStatus);

async function fetchShipments(sorting:SortingState, pagination:PaginationState, filterQuery:IFilterQuery) {
    const dateFrom = filterQuery.dateFrom.replace(/\//g, '-')
    const dateTo = filterQuery.dateTo.replace(/\//g, '-')

    let url = `shipments?page=${pagination.pageIndex + 1 }&pagesize=${pagination.pageSize}&dateFrom=${dateFrom}&dateTo=${dateTo}`;

    if(!isEmpty(sorting)){
        const column = sorting[0];
        url = url + `&sortorder=${column.desc ? 'D' : 'A'}&sortfield=${column.id}`
    }

    if(!isEmpty(filterQuery)){
        const {byBolNumber, byProNumber, bolProNumber, receiverName, receiverAddress, carrierName, serviceName, statusName} = filterQuery;

        if (bolProNumber) {
            if (byBolNumber) {
                url = url + `&byBolNumber=${byBolNumber}&bolProNumber=${bolProNumber}`;
            } else if (byProNumber) {
                url = url + `&byProNumber=${byProNumber}&bolproNumber=${bolProNumber}`;
            }
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

export const useCancelShipment = () => {
    const queryClient = useQueryClient();
    return useMutation(cancelShipment, {
        onSuccess: () => {
            queryClient.invalidateQueries('shipments')
        }
    })
}

const cancelShipment = async (shipmentId: number) =>
    await apiClient.put(`bol/${shipmentId}/cancelshipment`, {data: {}}).then(response => response.data)

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