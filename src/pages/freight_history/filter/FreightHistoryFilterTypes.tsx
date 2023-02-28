export interface IFilterQuery {
    byBolNumber: boolean,
    byProNumber: boolean,
    bolNumber?: number | null,
    proNumber?: number | null,
    bolProNumber?: number | null,
    receiverName? : string | null,
    serviceName: [] | undefined,
    statusName?: [] | undefined,
    receiverAddress?: string | null,
    dateFrom: string,
    dateTo: string,
    carrierName: [] | undefined
}