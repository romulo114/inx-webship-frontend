export interface IFilterQuery {
    quoteNumber?: number | null,
    receiverName? : string | null,
    serviceName: [] | undefined,
    statusName?: [] | undefined,
    receiverAddress?: string | null,
    dateFrom: string,
    dateTo: string,
    carrierName: [] | undefined
}