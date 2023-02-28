import React from 'react';
import InputText from "components/forms/InputText";
import CreatableDropdown from 'components/forms/CreatableDropdown';
import { useFormContext } from 'react-hook-form';

type PropTypes = {
    index: number;
    commodities: any;
}

export default function InputCommodities({index, commodities} : PropTypes) {

    const formMethods =  useFormContext();

    const commodityId = `load_information.${index}.commodity`;
    const updateCommodity = (commodity: string) => {
        formMethods.setValue(commodityId, commodity);
        formMethods.clearErrors(commodityId);
    }

    return (
        <div className="field__input">
            <label className="text-sbase block w-full mt-8">
                Commodities
            </label>
            <div className="flex">
                <div className={'w-60'}>
                    <CreatableDropdown
                        id={commodityId}
                        options={commodities}
                        placeholder='Commodities'
                        validation={{required:'Required Field'}}
                        onChange={(val: string) => updateCommodity(val)}
                    />
                </div>
                <div className="flex">
                    <label className={'ml-10 mr-5 mt-5'}>NMFC</label>
                    <InputText
                        id={`load_information.${index}.commodity_nmfc`}
                        placeholder="NMFC"
                        validation={{required:'Required Field'}}
                    />
                </div>
            </div>
        </div>
    );
}



