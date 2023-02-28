import * as React from 'react';
import {useFormContext, useWatch} from "react-hook-form";

export function LoadCalculations() {
    const { control } = useFormContext();
    const loadInformation = useWatch({
        control,
        name: "load_information",
    });

    const totalCubic = loadInformation.reduce(
        (previousValue: any, currentValue: any) =>
            previousValue + (
                (
                    (
                        Number(currentValue.dimension_length) *
                        Number(currentValue.dimension_width) *
                        Number(currentValue.dimension_height)
                    )
                    / 1728
                )
                * Number(currentValue.units)
            )
        , 0
    );

    const totalWeight = loadInformation.reduce(
        (previousValue: any, currentValue: any) =>
            previousValue + (Number(currentValue.weight) * Number(currentValue.units))
        , 0
    );

    const totalUnit = loadInformation.reduce(
        (previousValue: any, currentValue: any) =>
            previousValue + Number(currentValue.units)
        , 0
    );

    if(!totalCubic || !totalWeight || !totalUnit){
        return null;
    }

    const TotalPCF = Number(totalWeight / totalCubic)

    return (
        <div className='flex items-center space-x-8 ml-8 font-medium'>
            <div className='flex items-center text-sbase space-x-4'>
                <label className="text-blue-1">Total Cubic:</label>
                <span className='text-green-1'>{totalCubic.toFixed(2)}</span>
            </div>
            <div className='flex items-center text-sbase space-x-4'>
                <label className="text-blue-1">Total PCF:</label>
                <span className='text-green-1'>{TotalPCF.toFixed(2)}</span>
            </div>
            <div className='flex items-center text-sbase space-x-4'>
                <label className="text-blue-1">Total Weight:</label>
                <span className='text-green-1'>{totalWeight.toFixed(2)} lbs</span>
            </div>
            <div className='flex items-center text-sbase space-x-4'>
                <label className="text-blue-1">Total Handling Unit(s):</label>
                <span className='text-green-1'>{totalUnit}</span>
            </div>
        </div>
    );
}