import {useEffect, useState} from "react";
import ToggleButton from "components/forms/ToggleButton";
import InputText from "components/forms/InputText";
import Dropdown from "components/forms/Dropdown";
import {useInsuranceCommodities, usePackageCategories, useCoverageOptions} from "../../filter_form/FilterFormQueries";
import {useFormContext} from "react-hook-form";

type PropTypes = {
    setIsInsuranceInclude: Function;
}

export const InsuranceOptions = ({setIsInsuranceInclude}: PropTypes) => {
    const { watch, setValue } = useFormContext();
    const commodityId = watch('insurance_commodity')?.value;
    const { data: insurance } = useInsuranceCommodities();
    const { data: packageCategories } = usePackageCategories(commodityId);
    const { data: coverageOptions } = useCoverageOptions(commodityId);
    const [showInsuranceOptions, setShowInsuranceOptions] = useState(false);
    const toggle = () => {
        setShowInsuranceOptions(!showInsuranceOptions)
        setIsInsuranceInclude((prev:boolean)=> !prev)
    };
    
    useEffect(()=> {
        setValue("insurance_coverage_option", coverageOptions);
    }, [coverageOptions, setValue])
    
    useEffect(()=> {
        setValue("insurance_package_category", '')
    }, [commodityId, setValue])

    return (
        <div className={"flex flex-col items-start md:flex-row lg:flex-row lg:items-center lg:space-x-20 md:space-x-20"}>
            <ToggleButton id='has_insurance' label='Insurance' onChange={toggle}/>
            {showInsuranceOptions &&
                <>
                    <InputText
                        id="insurance_amount"
                        label={'Insured Amount'}
                        placeholder="weight"
                        validation={{required: 'Required Field'}}
                    />
                    <Dropdown
                        id="insurance_commodity"
                        label={'Commodity'}
                        options={insurance}
                        className={'w-60'}
                        validation={{required:'Required Field'}}
                    />
                    <div className={'w-60'}>
                        <Dropdown
                            id="insurance_package_category"
                            label={'Package Categories'}
                            options={packageCategories}
                            className={'w-60'}
                            validation={{required:'Required Field'}}
                        />
                    </div>
                    <div>
                        <InputText
                            id="insurance_coverage_option"
                            label={'Coverage Option'}
                            placeholder="Coverage Option"
                            validation={{required:'Required Field'}}
                            readOnly={true}
                        />
                    </div>
                </>
            }
        </div>
    )
}