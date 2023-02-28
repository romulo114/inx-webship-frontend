import apiClient from "utils/apiClient";
import {useQuery} from "react-query";
import {FilterFormTypes} from "../filter_form/FilterFormTypes";
import {chunk, find} from "lodash";
import {QuoteTypes} from "./QuoteTypes";

export function useQuotes(
    filters: FilterFormTypes,
    paginator: {perPage: number, page: number},
    topBarFilter: {bestValue: boolean, quickest: boolean},
    isInsuranceInclude: boolean
) {

    let opt:any = {
        refetchOnWindowFocus: false,
        select: (quotes : any) => {
            return {
                id: quotes.id,
                data: paginate(paginator, quotes.data),
                bestValue: find(quotes.data, ['bestPriceSortIndex', 0]),
                quickest: find(quotes.data, ['quickestSortIndex', 0]),
                total: quotes.total,
                allQuotes: quotes.data
            }
        }
    };

    if(topBarFilter.bestValue){
        opt = {
            refetchOnWindowFocus: false,
            select: (quotes : any) => {
                return {
                    id: quotes.id,
                    data: paginate(
                        paginator,
                        quotes.data.sort((a: QuoteTypes, b: QuoteTypes) => a.bestPriceSortIndex - b.bestPriceSortIndex )
                    ),
                    bestValue: find(quotes.data, ['bestPriceSortIndex', 0]),
                    quickest: find(quotes.data, ['quickestSortIndex', 0]),
                    total: quotes.total,
                    allQuotes: quotes.data                    
                }
            }
        };
    }

    if(topBarFilter.quickest){
        opt = {
            refetchOnWindowFocus: false,
            select: (quotes : any) => {
                return {
                    id: quotes.id,
                    data: paginate(
                        paginator,
                        quotes.data.sort((a: QuoteTypes, b: QuoteTypes) => a.quickestSortIndex - b.quickestSortIndex )
                    ),
                    bestValue: find(quotes.data, ['bestPriceSortIndex', 0]),
                    quickest: find(quotes.data, ['quickestSortIndex', 0]),
                    total: quotes.total,
                    allQuotes: quotes.data
                }
            }
        };
    }

    return useQuery(["quotes", filters], () => fetchQuotes(filters, isInsuranceInclude), opt)
}

function paginate(paginator: {perPage: number, page: number}, data: QuoteTypes[]){
    const dataChunks = chunk(data, paginator.perPage)
    return dataChunks[paginator.page -1];
}

async function fetchQuotes(filters: FilterFormTypes, isInsuranceInclude: boolean) {
    return await apiClient.post('freight-quote', mapFilterData(filters, isInsuranceInclude))
        .then((response: any) => {
            return {
                id: response.id,
                data:response.data,
                total: response.data.length,
                allQuotes: []
            }
        });
}

function mapFilterData(filters: FilterFormTypes, isInsuranceInclude: boolean) {
    let mapData: any = {
        "serviceTypes": filters.parcel_type,
        "originCountry": filters.origin_country.value,
        "originCity": filters.origin_city,
        "originState": filters.origin_state,
        "originAddressCode": filters.origin_post_code,
        "destinationCountry": filters.destination_country.value,
        "destinationCity": filters.destination_city,
        "destinationState": filters.destination_state,
        "destinationAddressCode": filters.destination_post_code,
        "stackType": "SINGLE",
        "freightItems": filters?.load_information?.map(load => {
            return {
                "dimensions": {
                    "length": load.dimension_length,
                    "width": load.dimension_width,
                    "height": load.dimension_height
                },
                "weight": load.weight,
                "measurementType": "IMPERIAL",
                "commodityDescription": load.commodity.value,
                "nmfcCode": load.commodity_nmfc,
                "classCode": load.class.value,
                "packageType": load.type.value,
                "numberOfUnits": load.units,
                "palletized": load.is_palletized
            }
        }),
    }

    if (isInsuranceInclude) {
        mapData.insuranceInformation = {
            "commodityClientCode": filters.insurance_commodity?.value,
            "packingMethodClientCode": filters.insurance_package_category?.value,
            "coverageOptionClientCode": filters.insurance_coverage_option,
            "insuredValue": {
                "insuredValueCurrencyISO": "USD",
                "invoiceAmount": filters.insurance_amount,
                "insuredValueAmount": filters.insurance_amount,
            }
        }
    }
    
    return mapData
}