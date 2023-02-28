import React, { useState } from "react";
import { Quote } from "./Quote";
import { useQuotes } from "./QuotesResultQueries";
import { LoadingIndicator } from "components/common/LoadingIndicator";
import { FilterFormTypes } from "../filter_form/FilterFormTypes";
import { isUndefined } from "lodash";
import { QuotesResultTopBar } from "./QuotesResultTopBar";
import { BOLInfo } from "pages/bol_info/BOLInfo";
import { QuotesResultPaginator, Paginator } from "./QuotesResultPaginator";
import moment from "moment";
import { printQuotes } from "pages/bol_info/api/bol_api";
import { PrintQuoteObj } from "pages/bol_info/constants/BOLConstants";
import { QuoteTypes } from "./QuoteTypes";

interface PropTypes {
  filters: FilterFormTypes;
  setFilters: Function;
  setAddressUpdInfo: Function;
  isInsuranceInclude: boolean;
}

export const QuotesResult = ({
  filters,
  setFilters,
  setAddressUpdInfo,
  isInsuranceInclude
}: PropTypes) => {
  const [topBarFilter, setTopBarFilter] = useState({
    bestValue: false,
    quickest: false,
  });
  const [paginator, setPaginator] = useState({ perPage: 10, page: 1 });
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(-1);
  const [checkedQuoteIds, setCheckedQuoteIds] = useState<string[]>([]);
  const {
    data: quotes,
    isLoading,
    isFetching,
    isError,
    error
  } = useQuotes(filters, paginator, topBarFilter, isInsuranceInclude);

  const setAddressUpdInfoAndClearQuotes = (obj: any) => {
    setFilters({});
    setSelectedQuoteIndex(-1);
    setAddressUpdInfo(obj);
  };

  if (isLoading || isFetching) {
    return <LoadingIndicator isLoading={true} />;
  }

  //TODO: improve error display
  if (isError) {
    if (error instanceof Error) {
      return <h1>{error.message}</h1>;
    }
  }

  if (isUndefined(quotes)) {
    return null;
  }

  const updQuoteCheck = (quoteId: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedQuoteIds([...checkedQuoteIds, quoteId]);
    } else {
      setCheckedQuoteIds(
        checkedQuoteIds.filter((item) => item !== quoteId)
      );
    }
  };

  const selectAllQuotes = () => {
    setCheckedQuoteIds(quotes.allQuotes.map((quote: QuoteTypes) => 
                    quote.providerQuoteItemId));
  };

  const clearAllQuotes = () => {
    setCheckedQuoteIds([]);
  };

  const printSelQuotes = () => {
    
    const checkedQuotes = quotes.allQuotes
      ? quotes.allQuotes.filter(
          (quote: QuoteTypes) => 
          checkedQuoteIds.indexOf(quote.providerQuoteItemId) !== -1
        )
      : [];

    if (checkedQuotes.length > 0) {
      let numberOfUnits = 0;
      let palletized = false;
      const items = filters.load_information ?
        filters.load_information.map((loadItem: any) => {
        numberOfUnits += Number(loadItem.units);
        if (loadItem.is_palletized) {
          palletized = true;
        }

        return {
          dimensions: {
            length: loadItem.dimension_length,
            width: loadItem.dimension_width,
            height: loadItem.dimension_height,
          },
          weight: loadItem.weight,
          classCode: loadItem.class.value,
          nmfcCode: loadItem.commodity_nmfc,
          packageType: loadItem.type.value,
          commodityDescription: loadItem.commodity.label,
          numberOfUnits: loadItem.units,
        };
      }) : [];

      const totalCubic = filters?.load_information?.reduce(
        (previousValue: any, currentValue: any) =>
          previousValue +
          ((Number(currentValue.dimension_length) *
            Number(currentValue.dimension_width) *
            Number(currentValue.dimension_height)) /
            1728) *
            Number(currentValue.units),
        0
      );

      const totalWeight = filters?.load_information?.reduce(
        (previousValue: any, currentValue: any) =>
          previousValue +
          Number(currentValue.weight) * Number(currentValue.units),
        0
      );

      const totalPcf = Number(totalWeight / totalCubic);

      const printQuoteObj: PrintQuoteObj = {
        quoteId: quotes.id,
        quoteGenMoment: moment(),
        origin: {
          countryCode: filters.origin_country.value,
          postalCode: filters?.origin_post_code,
          stateCode: filters.origin_state,
          city: filters.origin_city,
        },
        destination: {
          countryCode: filters.destination_country.value,
          postalCode: filters.destination_post_code,
          stateCode: filters.destination_state,
          city: filters.destination_city,
        },
        items,
        units: numberOfUnits,
        palletized,
        totalCubic,
        totalPcf,
        totalWeight,
        quotes: checkedQuotes
      };
      printQuotes(printQuoteObj);
    }
  };

  return (
    <>
      <QuotesResultTopBar
        {...{
          quotes,
          topBarFilter,
          setTopBarFilter,
          setPaginator,
          printSelQuotes,
          selectAllQuotes,
          clearAllQuotes,
          isControlEnabled: checkedQuoteIds.length > 0,
        }}
      />
      <div className="mb-[100px]">
        {quotes.data.map((quote: any, index: number) => (
            <React.Fragment key={index}>
              <Quote
                  index={index}
                  data={{
                    ...quote,
                    isChecked: checkedQuoteIds.indexOf(quote.providerQuoteItemId) !== -1,
                  }}
                  filters={filters}
                  {...{ selectedQuoteIndex }}
                  {...{ updQuoteCheck }}
                  setSelectedQuoteIndex={setSelectedQuoteIndex}
              />
              {selectedQuoteIndex === index && (
                  <BOLInfo setAddressUpdInfo={setAddressUpdInfoAndClearQuotes} />
              )}
            </React.Fragment>
        ))}
      </div>
      <QuotesResultPaginator
        paginator={paginator}
        setPaginator={(paginator: Paginator) => setPaginator(paginator)}
        totalCount={quotes.total}
      />
    </>
  );
};
