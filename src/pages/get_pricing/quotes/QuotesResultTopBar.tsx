import React, {useState} from "react";
import ButtonTopResult from "components/forms/buttons/ButtonTopResult";
import "components/forms/ToggleButton.scss"
import {IoMdPrint} from "react-icons/io";
import {FaEnvelope, FaSave} from "react-icons/fa";
import {Paginator} from "./QuotesResultPaginator";

interface PropTypes {
    quotes: any;
    topBarFilter: {bestValue: boolean, quickest: boolean}
    setTopBarFilter: Function;
    setPaginator: Function;
    isControlEnabled: boolean;
    printSelQuotes: Function;
    selectAllQuotes: Function;
    clearAllQuotes: Function;
}

export const QuotesResultTopBar = ({quotes, topBarFilter, setTopBarFilter,
     setPaginator, isControlEnabled, printSelQuotes, selectAllQuotes, 
     clearAllQuotes}: PropTypes) => {
    const [option, setOption] = useState(false);
    const quoteBestValue = quotes.bestValue;
    const quoteQuickest = quotes.quickest;
    const toggle = () => {
        setOption(!option);
        if (!option) {
            selectAllQuotes();
        } else {
            clearAllQuotes();
        }
        
    };
    const controlBtnColor = isControlEnabled || option ? 'text-blue-1' : 'text-gray-1';
    const controlBtnCursor = isControlEnabled || option? 'cursor-pointer' : 'cursor-not-allowed';

    const onClickFilterBestValue = () => {
        setTopBarFilter({bestValue: true, quickest: false});
        setPaginator((prevState: Paginator) => ({
            ...prevState,
            page: 1
        }));
    }

    const onClickFilterQuickest = () => {
        setTopBarFilter({bestValue: false, quickest: true});
        setPaginator((prevState:any) => ({
            ...prevState,
            page: 1
        }));
    }

    return (
        <div
            className="px-12 lg:mx-6 mt-6 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center md:justify-start md:w-full md:space-x-12 space-x-2">
                <ButtonTopResult
                    balance={quoteBestValue.price}
                    borderColor="#65b32d"
                    bgColor="#d0e5bd"
                    label="best value"
                    transitTime={quoteBestValue.transitTime}
                    isSelected={topBarFilter.bestValue}
                    onClick={onClickFilterBestValue}
                />
                <ButtonTopResult
                    balance={quoteQuickest.price}
                    borderColor="#bdc268"
                    bgColor="#e5e5bd"
                    label="quickest"
                    transitTime={quoteQuickest.transitTime}
                    isSelected={topBarFilter.quickest}
                    onClick={onClickFilterQuickest}
                />
            </div>
            <div className="flex lg:items-center items-start justify-between md:justify-end md:w-full lg:justify-start w-full lg:w-auto flex-row-reverse lg:flex-row mt-12 lg:mt-0 md:space-x-8">
                <div className="flex lg:items-center item-start md:space-x-8">
                    <div className="flex items-center lg:flex-row flex-col-reverse">
                        <div className="text-green-1 mr-4 pt-3 whitespace-nowrap">Select all</div>
                        <div className="toggleBtn" onClick={toggle}>
                            {/* <input
                                type="checkbox"
                                className='toggleOption'
                            /> */}
                            <label className={`labelToggle before:!h-12 -mt-1 ${option ? 'toggleOptionActive' : ''}`} />
                        </div>
                    </div>
                    <IoMdPrint size="1.8em" onClick={() => printSelQuotes()}
                        className={`${controlBtnColor} ${controlBtnCursor} lg:mx-6 mx-2 mt-2 lg:mt-0`}/>
                    <FaEnvelope size="1.6em" className={`${controlBtnColor} ${controlBtnCursor} lg:mx-6 mx-2 mt-2 lg:mt-0`}/>
                    <FaSave size="1.6em" className={`${controlBtnColor} ${controlBtnCursor} lg:mx-6 mx-2 mt-2 lg:mt-0`}/>
                </div>
                <div className="flex items-center lg:flex-row flex-col" >
                    <div className="text-green-1 uppercase font-medium whitespace-nowrap">quote id:</div>
                    <div className="ml-2">{quotes.id}</div>
                </div>
            </div>
        </div>
    )
};