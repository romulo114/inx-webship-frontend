import React from 'react';
import InputText from "components/forms/InputText";
import Dropdown from "components/forms/Dropdown";

type PropTypes = {
    index: number;
}

const options = [
    { value: 'Lbs', label: 'Lbs' },
    { value: 'Kgs', label: 'Kgs' },
]

export default function InputTextWeight({index} : PropTypes) {

    return (
        <div className="field__input">
            <label className="text-sbase block w-full mt-8">
                Weight
            </label>
            <div className="flex">
                <InputText
                    id={`load_information.${index}.weight`}
                    placeholder="weight"
                    validation={{required:'Required Field'}}
                />
                <div className={'w-60'}>
                    <Dropdown
                        id={`load_information.${index}.weight_unit`}
                        options={options}
                        className={'ml-5'}
                        validation={{required:'Required Field'}}
                    />
                </div>
            </div>
        </div>
    );
}