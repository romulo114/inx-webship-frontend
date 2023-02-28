import React,{useState} from "react";
import {QuoteTypes} from "./QuoteTypes";
import {QuoteDetails} from "./QuoteDetails";
import {FilterFormTypes} from "../filter_form/FilterFormTypes";
import {QuoteItem} from "./QuoteItem";

interface PropTypes {
    data: QuoteTypes;
    filters: FilterFormTypes;
    index: number;
    selectedQuoteIndex: number;
    setSelectedQuoteIndex: Function;
    updQuoteCheck: Function;
}

export const Quote = ({data, filters, index, selectedQuoteIndex, setSelectedQuoteIndex, updQuoteCheck}: PropTypes) => {
    const [showQuoteDetails, setShowQuoteDetails] = useState(false);
    return (
        <>
            <QuoteItem {...{filters, data, showQuoteDetails, setShowQuoteDetails, index, setSelectedQuoteIndex, updQuoteCheck }} />
            <QuoteDetails {...{filters, data, showQuoteDetails}} />
        </>
    );
};