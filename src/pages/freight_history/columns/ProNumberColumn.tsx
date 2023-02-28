import React, { useState } from "react";
import { FaPencilAlt,FaCheck } from "react-icons/fa";
import { isEmpty } from "lodash";
import apiClient from "utils/apiClient";

interface PropTypes {
    cellContext: any;
}

export const ProNumberColumn = ({ cellContext }: PropTypes) => {
    const [isEditable, setIsEditable] = useState(false);
    const [hasSaved, setHasSaved] = useState(false);
    const [originValue, setOriginValue] = useState(cellContext.row.original.issuedProNumber);
    const [currentValue, setCurrentValue] = useState(cellContext.row.original.customerProNumber);
    const [inputValue, setInputValue] = useState(cellContext.row.original.customerProNumber);

    if (isEmpty(cellContext.getValue())) {
        return null;
    }

    const onClickCheck = () => {
        apiClient.post(`freight-shipment/${cellContext.row.original.shipmentId}/pronumber/${inputValue}`, {data:{}})
            .then((response: any) => {
                setIsEditable(false);
                setOriginValue(currentValue);
                setCurrentValue(inputValue);
            });
    }

    const onClickPencil = () => {
        setHasSaved(true);
        setIsEditable(true);
    }

    return (
        <div
            className="flex items-center space-x-2 pr-4"
        >
            {isEditable ? (
                <input
                    className="underline text-blue-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            ) : (hasSaved || currentValue !== originValue) ? (
                <div className="flex flex-col">
                    <span className="text-lighter-gray text-ssmall mb-1">Orig:{originValue}</span>
                    <span className="text-green-1 underline">{currentValue}</span>
                </div>
            ) : (
                <span className="text-green-1 underline">{currentValue}</span>
            )}
            <div className="p-3 cursor-pointer">
                {isEditable ? (
                    <FaCheck
                        onClick={onClickCheck}
                        color="#0c214c"
                        size="1.2em"
                    />
                ) : (
                    <FaPencilAlt
                        onClick={onClickPencil}
                        size="1.2em"
                        color={"#65b32d"}
                    />
                )}
            </div>
        </div>
    );
};