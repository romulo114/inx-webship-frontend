export type QuoteTypes = {
    id: number,
    carrierId: number,
    carrierName: string,
    carrierLogo: string,
    tariffId: number,
    tariffDescription: string,
    tariffOwner: string,
    accountNumber: string,
    price: number,
    quoteNumber: string,
    transitTime: string,
    originPhone: string,
    destinationPhone: string,
    message: string,
    providerQuoteItemId: string,
    quickestSortIndex: number,
    bestPriceSortIndex: number,
    isChecked?: boolean
}
