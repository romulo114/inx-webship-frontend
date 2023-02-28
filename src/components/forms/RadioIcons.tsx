import React from 'react';
import {FaBoxes, FaHandHolding, FaTruckMoving} from "react-icons/fa";
import {ValidationType} from "./Types";
import "./RadioIcons.scss"
import {get, without, xor} from "lodash";
import {useFormContext} from "react-hook-form";

type PropTypes = {
    id: string,
    label: string,
    validation: ValidationType;
}

export default function RadioIcons({id, label, validation}: PropTypes) {
    // access the form context
    const { register, setValue, getValues, formState: { errors } } = useFormContext();

    const onChange = (event: any ,type: string) => {
        const currentValues = getValues(id);
        switch (type) {
            case 'LTL':
                setValue(id, without(xor(currentValues, ['LTL']), 'WHITE_GLOVE_ALL'));
                break;
            case 'VOLUME':
                setValue(id, without(xor(currentValues, ['VOLUME']), 'WHITE_GLOVE_ALL'));
                break;
            case 'WHITE_GLOVE_ALL':
                setValue(id, ['WHITE_GLOVE_ALL']);
                break;
        }
    }

    return (
        <>
            <small className="quote__label">
                {label}
            </small>
            <div className="quote__field">
                <div className="quote__field__bol">
                    <div className="quote__field__options">
                        <input
                            {...register(id, validation)}
                            type="checkbox"
                            value="LTL"
                            className='green-check'
                            onClick={(e) => onChange(e,"LTL")}
                        />
                        <label htmlFor="ltl">
                            <FaTruckMoving size='3em' title="Volume"/>
                            <span>ltl</span>
                        </label>
                    </div>
                </div>
                <div className="quote__field__bol">
                    <div className="quote__field__options">
                        <input
                            readOnly
                            type="checkbox"
                            {...register(id, validation)}
                            value="VOLUME"
                            className='green-check'
                            onClick={(e) => onChange(e,"VOLUME")}
                        />
                        <label htmlFor="volume">
                            <FaBoxes size='3em' title="Volume"/>
                            <span>volume</span>
                        </label>
                    </div>
                </div>
                <div className="quote__field__bol">
                    <div className="quote__field__options">
                        <input
                            readOnly
                            type="checkbox"
                            {...register(id, validation)}
                            value="WHITE_GLOVE_ALL"
                            className='green-check'
                            onClick={(e) => onChange(e,"WHITE_GLOVE_ALL")}
                        />
                        <label htmlFor="whiteglove">
                            <div className={'-mt-6 mb-6'}>
                                <FaHandHolding size='3.5em' title="whiteglove"/>
                            </div>
                            <span className={'-ml-10'}>white glove</span>
                        </label>
                    </div>
                </div>
            </div>
            {errors && <span className={'text-red-1 text-xl mt-2'}>{get(errors, id)?.message}</span>}
        </>
    );
}