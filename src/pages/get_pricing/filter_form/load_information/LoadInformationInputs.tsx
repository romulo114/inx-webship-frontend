

import * as React from 'react';
import {useFieldArray, useFormContext} from "react-hook-form";
import {GetClasses} from "utils/constants/DropdownOptions";
import Dropdown from "components/forms/Dropdown";
import InputNumber from "components/forms/InputNumber";
import ToggleButton from "components/forms/ToggleButton";
import InputCommodities from "pages/get_pricing/filter_form/inputs/InputCommodities";
import InputTextDimensions from "pages/get_pricing/filter_form/inputs/InputTextDimensions";
import InputTextWeight from "pages/get_pricing/filter_form/inputs/InputTextWeight";
import ToggleHazmat from "pages/get_pricing/filter_form/inputs/ToggleHazmat";
import {LinkIconLabel} from "components/common/navigation/Links/LinkIconLabel/LinkIconLabel";
import {TiDeleteOutline} from "react-icons/ti";
import {LoadCalculations} from "./LoadCalculations";

type PropTypes = {
    commodities: { value: string, label: string }[];
    packageTypes: { value: string, label: string }[];
};

export function LoadInformationInputs({ commodities, packageTypes }: PropTypes) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "load_information"
    });

    return (
        <>
            <div className="flex items-center">
                <div className={'flex items-center'}>
                    <h4 className="capitalize text-sxl text-medium-gray font-medium">
                        Load Information
                    </h4>
                </div>
                <LoadCalculations/>
            </div>
            <div>
                {fields.map((item, index) => (
                    <div key={item.id}
                         className={'w-full flex flex-col justify-between gap-x-10 md:flex-wrap lg:flex-nowrap md:flex-row'}
                    >
                        <InputTextDimensions {...{index}} />
                        <InputTextWeight {...{index}} />
                        <InputCommodities {...{index, commodities}} />
                        <div className={'w-40'}>
                            <Dropdown
                                id={`load_information.${index}.class`}
                                label="Class"
                                options={GetClasses()}
                                className={'w-40'}
                                placeholder="class"
                                validation={{required:'Required Field'}}
                            />
                        </div>
                        <div className={'w-60'}>
                            <Dropdown
                                id={`load_information.${index}.type`}
                                label="Type"
                                options={packageTypes}
                                className={'w-60'}
                                placeholder="type"
                                validation={{required:'Required Field'}}
                            />
                        </div>
                        <InputNumber
                            id={`load_information.${index}.units`}
                            label={'Units'}
                            placeholder="units"
                            validation={{
                                required: "required",
                                min: {value: 1, message: "Min unit is 1"},
                            }}
                        />
                        <ToggleButton
                            id={`load_information.${index}.is_palletized`}
                            label='Palletized'
                        />
                        <ToggleHazmat {...{index}}/>
                        <div className={'w-48 pt-[40px]'}>
                            { index === 0
                                ?
                                <LinkIconLabel
                                    icon='FiPlusCircle'
                                    label="Add new line"
                                    onClick={() => append({ is_palletized: true, type: {value: 'Pallets', label: 'Pallets'} })}
                                />
                                :
                                <div
                                    className="flex items-center bg-transparent border-none right-0 top-2 text-red-1 cursor-pointer text-xl focus:outline-none"
                                    onClick={() => remove(index)}
                                >
                                    <TiDeleteOutline color='#dc3848' size='2em'/>
                                    <span className="pl-2 text-xl">Delete</span>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}