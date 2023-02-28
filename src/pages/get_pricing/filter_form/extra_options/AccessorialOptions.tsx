import React from "react";
import ToggleButton from "components/forms/ToggleButton";
import Dropdown from "components/forms/Dropdown";
import {useFormContext} from "react-hook-form";

type PropTypes = {
    accessorials: { value: string, label: string }[];
}

export const AccessorialOptions = ({accessorials} : PropTypes) => {
    const { watch } = useFormContext();
    const showAccessorialOptions = watch('has_accessorials');

    return (
        <div className={'flex flex-col items-start md:flex-row lg:flex-row lg:items-end md:items-end'}>
            <ToggleButton id='has_accessorials' label='Accessorials'/>
            {showAccessorialOptions &&
                <div className={'flex items-end ml-5'}>
                    <label className={'mr-5 mb-4'}>- Yes</label>
                    <Dropdown
                        id="accessorial"
                        isMulti={true}
                        options={accessorials}
                        validation={{required:'Required Field'}}
                    />
                </div>
            }
        </div>
    )
}