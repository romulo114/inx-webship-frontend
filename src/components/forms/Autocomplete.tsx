import React, { useState } from "react";
import { get, has } from "lodash";
import { ValidationType } from "./Types";
import { useFormContext } from "react-hook-form";
import { getPostCodeLookupDetails } from "pages/bol_info/api/bol_api";
import { PostalCodeSearchRes } from "pages/bol_info/constants/BOLConstants";

interface PropTypes {
  id: string;
  label?: string;
  className?: string;
  placeholder: string;
  validation: ValidationType;
  onSuggestionClicked: Function;
}

export default function Autocomplete({
  id,
  label,
  className,
  placeholder,
  validation,
  onSuggestionClicked,
}: PropTypes) {
  const {
    register,
    formState: { errors },
    clearErrors
  } = useFormContext();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsListComponent, setSuggestionsListComponent] = useState(
    <></>
  );

  const onClick = (suggestion: PostalCodeSearchRes) => {
    setShowSuggestions(false);
    onSuggestionClicked(suggestion);
  };
  
  const getSuggestions = (userInput: string) => {
    getPostCodeLookupDetails(userInput).then(res => {
      if (res.data.length === 1) {
        setShowSuggestions(false);
        onSuggestionClicked(res.data[0]);
      } else if (res.data.length > 0) {
        setSuggestionsListComponent(
          <ul className="pl-0 overflow-y-auto max-h-[150px] mb-2 mt-1 border-[1px] border-solid border-blue-1">
            {res.data.map((suggestion: PostalCodeSearchRes, index: number) => {
              return (
                <li className="p-[0.5rem] border-b-[1px] solid border-gray-1 hover:bg-lightest-gray hover:text-blue-1 cursor-pointer"
                  key={index}
                  onClick={() => onClick(suggestion)}
                >
                  {`${suggestion.postalCode}  ${suggestion.stateCode}  ${suggestion.cityName}`}
                </li>
               );
            })}
          </ul>
        );
      } else {
        setShowSuggestions(false);
        setSuggestionsListComponent(
          <></>          
        );
      }
    });
  };

  return (
    <div className={className}>
      {label && <label className="text-sbase block w-full mt-8">{label}</label>}
      <div className={"w-full"}>
        <input
          {...register(id, validation)}
          placeholder={placeholder}
          className={
            "cursor-pointer w-40 md:w-48 h-s19 rounded-[0.4rem] py-3 px-5 border border-solid border-light-gray" +
            (has(errors, id)
              ? " border-red-1 placeholder:text-red-1 placeholder:opacity-40"
              : "")
          }
          type="number"
          onChange={(event) => {
            clearErrors(id);
            const { value } = event.target;
            if (value.length === 5) {
              setShowSuggestions(true);
              getSuggestions(value);
            } else {
              setShowSuggestions(false);
            }
          }}
          
        />
        {showSuggestions && suggestionsListComponent}
        {errors && (
          <span className={"text-red-1 text-xl mt-2"}>
            {get(errors, id)?.message}
          </span>
        )}
      </div>
    </div>
  );
}
