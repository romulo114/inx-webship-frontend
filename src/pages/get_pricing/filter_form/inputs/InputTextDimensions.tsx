import React from 'react';
import InputText from "components/forms/InputText";

type PropTypes = {
    index: number;
}

export default function InputTextDimensions({index} : PropTypes) {

    return (
        <div>
            <label className="text-sbase block w-full mt-8">
                Dimensions <span className={'text-stone-500'} >(L x W x H)</span>
            </label>
            <div className={'flex'}>
                <InputText id={`load_information.${index}.dimension_length`} placeholder="length" validation={{required:'Required Field'}} />
                <InputText id={`load_information.${index}.dimension_width`} placeholder="width" className={'ml-8'} validation={{required:'Required Field'}} />
                <InputText id={`load_information.${index}.dimension_height`} placeholder="height" className={'ml-8'}  validation={{required:'Required Field'}} />
            </div>
        </div>
    );
}



