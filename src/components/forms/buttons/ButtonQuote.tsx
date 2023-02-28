import React from "react";

type Props = {
    label: string;
    className: string;
    type?: "button" | "reset" | "submit";
    hasIcon?: boolean;
    icon?: any;
    onClick?: Function;
    disabled?: boolean;
};

export default function ButtonQuote(props: Props) {
    const { label, className, type = "button", hasIcon = false, icon, disabled = false } = props;
    return (
        <button type={type} disabled={disabled} className={`${className} + '' + ${hasIcon ? ' space-x-2':''}`}
        onClick={() => props.onClick?.()}>
            {
                hasIcon && icon
            }
            <span>{label}</span>
        </button>
    );
}