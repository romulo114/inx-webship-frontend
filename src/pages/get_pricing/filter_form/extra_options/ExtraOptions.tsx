import {LinkIconLabel} from "components/common/navigation/Links/LinkIconLabel/LinkIconLabel";
import {InsuranceOptions} from "./InsuranceOptions";
import {AccessorialOptions} from "./AccessorialOptions";
import {useFormContext} from "react-hook-form";

type PropTypes = {
    accessorials: { value: string, label: string }[];
    setIsInsuranceInclude: Function;
}

export const ExtraOptions = ({accessorials, setIsInsuranceInclude} : PropTypes) => {
    const { watch, setValue, getValues } = useFormContext();
    const showExtraOptions = watch('has_extra_options');
    const toggle = () => {
        setValue('has_extra_options',
            !getValues('has_extra_options')
        );
        setIsInsuranceInclude(false);
    }

    return (
        <div className="">
            {
                showExtraOptions ?
                    <>
                        <LinkIconLabel icon='FaEyeSlash' label="Hide extra options" onClick={toggle} />
                        <div className='flex flex-col lg:flex-row lg:space-x-20'>
                            <InsuranceOptions {...{setIsInsuranceInclude}}/>
                            <AccessorialOptions {...{accessorials}} />
                        </div>
                    </>
                    :
                    <LinkIconLabel icon='FaEye' label="Show extra options" onClick={toggle}/>
            }
        </div>
    )
}