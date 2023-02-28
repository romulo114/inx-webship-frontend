// @ts-nocheck
import {useCallback, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom'
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Container } from "components/common/container/Container";
import RadioIcons from "components/forms/RadioIcons";
import InputText from "components/forms/InputText";
import { LinkIconLabel } from "components/common/navigation/Links/LinkIconLabel/LinkIconLabel";
import Button from "components/forms/buttons/Button";
import { FaExchangeAlt } from "react-icons/fa";
import DropdownCountry from "components/forms/DropdownCountry";
import {ExtraOptions} from "./extra_options/ExtraOptions";
import {LoadInformationInputs} from "./load_information/LoadInformationInputs";
import {FilterFormTypes} from "./FilterFormTypes";
import {defaultValues} from "./FilterFormDefaultValues";
import { useDispatch, useSelector } from "react-redux";
import { dispatchPricingData } from "pages/bol_info/utility/BolDataDispatcher";
import { isNil, isUndefined} from "lodash";
import {AddressBookDialog, Overlay} from "../../bol_info/common/AddressBookDialog";
import { PostalCodeSearchRes } from "pages/bol_info/constants/BOLConstants";
import {useAccessorials, useCommodities, useCountries, useDefaultAddresses, usePackageTypes, useData} from "./FilterFormQueries";
import Autocomplete from "components/forms/Autocomplete";
interface PropTypes {
  setFilters: Function;
  dataId: undefined|string
  addressUpdInfo: any;
  setIsInsuranceInclude: Function;
}

export const FilterForm = ({ setFilters, dataId, addressUpdInfo, setIsInsuranceInclude }: PropTypes) => {
  const location = useLocation();
  const pathName = location.pathname.split('/');
  const isShipment = pathName[2] === 'shipment'
  const { data: countries } = useCountries();
  const { data: commodities } = useCommodities();
  const { data: accessorials } = useAccessorials();
  const { data: packageTypes } = usePackageTypes();
  const { data: defaultAddresses } = useDefaultAddresses();
  const { data: populateData } = useData(dataId, isShipment);

  const formMethods = useForm<FilterFormTypes>({
    defaultValues: defaultValues,
  });

  const setUserDefaultValues = useCallback(() => {

    // get default origin address
    const defaultOriginAddress = defaultAddresses?.defaultOriginAddress;
    if(!isNil(defaultOriginAddress)){
      formMethods.setValue('origin_country', countries.find(obj => obj.code === defaultOriginAddress.countryCode));
      formMethods.setValue('origin_state', defaultOriginAddress.stateCode);
      formMethods.setValue('origin_city', defaultOriginAddress.city);
      formMethods.setValue('origin_post_code', defaultOriginAddress.postalCode);     
      formMethods.setValue('origin_address1', defaultOriginAddress.address1);
      formMethods.setValue('origin_address2', defaultOriginAddress.address2);
      formMethods.setValue('origin_companyName', defaultOriginAddress.companyName);
      formMethods.setValue('origin_contactName', defaultOriginAddress.contactName);
      formMethods.setValue('origin_email', defaultOriginAddress.email);
      formMethods.setValue('origin_phone', defaultOriginAddress.phone.replace(/ /g, ''));
    }

    // get default destination address
    const defaultDestinationAddress = defaultAddresses?.defaultDestinationAddress;
    if(!isNil(defaultDestinationAddress)){
      formMethods.setValue('destination_country',
          countries.find(obj => obj.code === defaultDestinationAddress.countryCode)
      );
      formMethods.setValue('destination_state', defaultDestinationAddress.stateCode);
      formMethods.setValue('destination_city', defaultDestinationAddress.city);
      formMethods.setValue('destination_post_code', defaultDestinationAddress.postalCode); 
      formMethods.setValue('destination_address1', defaultDestinationAddress.address1);
      formMethods.setValue('destination_address2', defaultDestinationAddress.address2);
      formMethods.setValue('destination_companyName', defaultDestinationAddress.companyName);
      formMethods.setValue('destination_contactName', defaultDestinationAddress.contactName);
      formMethods.setValue('destination_email', defaultDestinationAddress.email);
      formMethods.setValue('destination_phone', defaultDestinationAddress.phone.replace(/ /g, ''));    
    }

  }, [formMethods, countries, defaultAddresses]);

  const setShipmentRequoteValues = useCallback(() => {

    // origin address
    formMethods.setValue('origin_country', countries.find(obj => obj.code === populateData.shipperAddress.countryCode));
    formMethods.setValue('origin_state', populateData.shipperAddress.stateCode);
    formMethods.setValue('origin_city', populateData.shipperAddress.city);
    formMethods.setValue('origin_post_code', populateData.shipperAddress.postalCode);

    // destination address
    formMethods.setValue('destination_country', countries.find(obj => obj.code === populateData.consigneeAddress.countryCode));
    formMethods.setValue('destination_state', populateData.consigneeAddress.stateCode);
    formMethods.setValue('destination_city', populateData.consigneeAddress.city);
    formMethods.setValue('destination_post_code', populateData.consigneeAddress.postalCode);

    populateData.freightItems.forEach((item, index) => {

      formMethods.setValue(`load_information.${index}.dimension_length`, populateData.freightItems[index].dimensions.length);
      formMethods.setValue(`load_information.${index}.dimension_width`, populateData.freightItems[index].dimensions.width);
      formMethods.setValue(`load_information.${index}.dimension_height`, populateData.freightItems[index].dimensions.height);

      formMethods.setValue(`load_information.${index}.weight`, populateData.freightItems[index].weight);

      formMethods.setValue(`load_information.${index}.commodity`,
          commodities.find(obj => obj.label === populateData.freightItems[index].commodityDescription)
      );

      formMethods.setValue(`load_information.${index}.commodity_nmfc`, populateData.freightItems[index].nmfcCode);

      formMethods.setValue(`load_information.${index}.class`,
          {value: populateData.freightItems[index].classCode, label: populateData.freightItems[index].classCode}
      );

      formMethods.setValue(`load_information.${index}.type`,
          {value: populateData.freightItems[index].packageType, label: populateData.freightItems[index].packageType}
      );

      formMethods.setValue(`load_information.${index}.units`, populateData.freightItems[index].numberOfUnits);
      formMethods.setValue(`load_information.${index}.is_palletized`, populateData.freightItems[index].palletized);
      formMethods.setValue(`load_information.${index}.is_hazmat`, populateData.freightItems[index].hazmat);
    });

  }, [formMethods, countries, populateData, commodities]);

  const setQuoteRequoteValues = useCallback(() => {

    // origin address
    formMethods.setValue('origin_country', countries.find(obj => obj.code === 'United States'));
    formMethods.setValue('origin_state', populateData.quoteRequest.originState);
    formMethods.setValue('origin_city', populateData.quoteRequest.originCity);
    formMethods.setValue('origin_post_code', populateData.quoteRequest.originAddressCode);

    // destination address
    formMethods.setValue('destination_country', countries.find(obj => obj.code === 'United States'));
    formMethods.setValue('destination_state', populateData.quoteRequest.destinationState);
    formMethods.setValue('destination_city', populateData.quoteRequest.destinationCity);
    formMethods.setValue('destination_post_code', populateData.quoteRequest.destinationAddressCode);

    populateData.quoteRequest.freightItems.forEach((item, index) => {

      formMethods.setValue(`load_information.${index}.dimension_length`, populateData.quoteRequest.freightItems[index].dimensions.length);
      formMethods.setValue(`load_information.${index}.dimension_width`, populateData.quoteRequest.freightItems[index].dimensions.width);
      formMethods.setValue(`load_information.${index}.dimension_height`, populateData.quoteRequest.freightItems[index].dimensions.height);

      formMethods.setValue(`load_information.${index}.weight`, populateData.quoteRequest.freightItems[index].weight);

      formMethods.setValue(`load_information.${index}.commodity`,
          commodities.find(obj => obj.label === populateData.quoteRequest.freightItems[index].commodityDescription)
      );

      formMethods.setValue(`load_information.${index}.commodity_nmfc`, populateData.quoteRequest.freightItems[index].nmfcCode);

      // TODO: populate classCode and packageType when API is fixed
      // formMethods.setValue(`load_information.${index}.class`,
      //     {value: populateData.quoteRequest.freightItems[index].classCode, label: populateData.quoteRequest.freightItems[index].classCode}
      // );

      // formMethods.setValue(`load_information.${index}.type`,
      //     {value: populateData.quoteRequest.freightItems[index].packageType, label: populateData.quoteRequest.freightItems[index].packageType}
      // );

      formMethods.setValue(`load_information.${index}.units`, populateData.quoteRequest.freightItems[index].numberOfUnits);
      formMethods.setValue(`load_information.${index}.is_palletized`, populateData.quoteRequest.freightItems[index].palletized);
      formMethods.setValue(`load_information.${index}.is_hazmat`, populateData.quoteRequest.freightItems[index].hazmat);
    });

  }, [formMethods, countries, populateData, commodities]);

  useEffect(() => {
    if(countries) {
      if(isUndefined(populateData)){
        setUserDefaultValues();
      } else {
        if (isShipment) {
          setShipmentRequoteValues();
        } else {
          setQuoteRequoteValues();
        }
      }
    }
  }, [countries, populateData, setUserDefaultValues, setShipmentRequoteValues, setQuoteRequoteValues, isShipment]);

  useEffect(() => {
    if (Array.isArray(addressUpdInfo)) {
      addressUpdInfo.forEach((item: any) => {
        formMethods.setValue(item.key, item.value);
      });
    }
  }, [formMethods, addressUpdInfo])

  const dispatch = useDispatch();
  const addressBookData = useSelector((state: RootState) => state.bolInfoReducer.addressBookData);

  const onSubmit: SubmitHandler<FilterFormTypes> = (data) => {
    setFilters(data);
    dispatchPricingData(data, addressBookData, dispatch);
  };

  const [isShipperAddressBookOpen, setShipperAddressBookOpen] = useState(false);

  const addAddressBookInfo = (isShipperInfo: boolean, addressInfo: AddressBookEntry) => {
    setShipperAddressBookOpen(false);

    if (isShipperInfo) {
      formMethods.setValue('origin_country', countries.find(obj => obj.code === addressInfo.countryCode));
      formMethods.setValue('origin_state', addressInfo.stateCode);
      formMethods.setValue('origin_city', addressInfo.city);
      formMethods.setValue('origin_post_code', addressInfo.postalCode);

      /* Additional info required for bol form */
      formMethods.setValue('origin_address_id', addressInfo.addressBookAddressId);
      /********************************************/

      return null;
    }

    formMethods.setValue('destination_country', countries.find(obj => obj.code === addressInfo.countryCode));
    formMethods.setValue('destination_state', addressInfo.stateCode);
    formMethods.setValue('destination_city', addressInfo.city);
    formMethods.setValue('destination_post_code', addressInfo.postalCode);

    /* Additional info required for bol form */
    formMethods.setValue('destination_address_id', addressInfo.addressBookAddressId);
    /********************************************/

  }

  const swapValue = (srcKey, destinationKey, srcVal, destinationVal) => {
    formMethods.setValue(srcKey, destinationVal);
    formMethods.setValue(destinationKey, srcVal);
  }

  const swapOriginDestination = () => {
    const formValues = formMethods.getValues();
    swapValue('origin_country', 'destination_country', formValues.origin_country, formValues.destination_country);
    swapValue('origin_state', 'destination_state', formValues.origin_state, formValues.destination_state);
    swapValue('origin_city', 'destination_city', formValues.origin_city, formValues.destination_city);
    swapValue('origin_post_code', 'destination_post_code', formValues.origin_post_code, formValues.destination_post_code);
    swapValue('origin_address_id', 'destination_address_id', formValues.origin_address_id, formValues.destination_address_id);
  }
    return (
      <Container>
        <FormProvider {...formMethods}>
          <form
              className="flex flex-col gap-y-16"
              onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            {isShipperAddressBookOpen ? (
                <>
                  <Overlay />
                  <AddressBookDialog
                      fromShipperForm={false}
                      isShipper={true}
                      onClick={(isShipperClicked: boolean, address: AddressBookEntry) => addAddressBookInfo(isShipperClicked, address)}
                      onDialogClose={() => setShipperAddressBookOpen(false)} />
                </>
            ) : (
                <></>
            )}
            <div className="quote__firstRow">
              <div className="quote__information">
                <h4 className="text-sxl capitalize text-medium-gray font-medium">parcel information</h4>
                <RadioIcons
                    id="parcel_type"
                    label="type"
                    validation={{ required: "Required Field" }}
                />
              </div>
              <div className="mt-0 md:mt-8">
                <div className="flex justify-between">
                  <h4 className="text-sxl capitalize text-medium-gray font-medium">Origin and destination</h4>
                  <LinkIconLabel
                      icon="RiContactsBook2Fill"
                      onClick={() => setShipperAddressBookOpen(true)}
                      label="Address Book"
                  />
                </div>
                <div className="quote__details">
                  <div className="">
                    <div className="relative">
                      <div className="quote__address__firstrow">
                        <DropdownCountry
                            id="origin_country"
                            label="Country"
                            placeholder="country"
                            options={countries}
                            className="w-80"
                            validation={{ required: "Required Field" }}
                        />
                        <div className="field quote__fieldInput">
                          <Autocomplete
                            id="origin_post_code"
                            label="Post Code"
                            placeholder="post code"
                            validation={{ required: "Required Field" }}
                            onSuggestionClicked={(suggestion: PostalCodeSearchRes) => {
                              formMethods.setValue('origin_state', suggestion.stateCode);
                              formMethods.setValue('origin_city', suggestion.cityName);
                              formMethods.setValue('origin_post_code', suggestion.postalCode);
                              formMethods.clearErrors('origin_city');
                              formMethods.clearErrors('origin_state');
                            }}
                        />
                          <InputText
                              id="origin_state"
                              label="State"
                              placeholder="state"
                              validation={{ required: "Required Field" }}
                          />
                          <InputText
                              id="origin_city"
                              label="City"
                              placeholder="city"
                              validation={{ required: "Required Field" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="pt-10 bg-transparent border-none mt-4"
                   onClick={() => swapOriginDestination()}>
                    <FaExchangeAlt color="#65b32d" size="2em" />
                  </button>
                  <div className="">
                    <div className="relative">
                      <div className="quote__address__firstrow">
                        <DropdownCountry
                            id="destination_country"
                            label="Country"
                            placeholder="country"
                            options={countries}
                            className="w-80"
                            validation={{ required: "Required Field" }}
                        />
                        <div className="field quote__fieldInput">
                          <Autocomplete
                            id="destination_post_code"
                            label="Post Code"
                            placeholder="post code"
                            validation={{ required: "Required Field" }}
                            onSuggestionClicked={(suggestion: PostalCodeSearchRes) => {
                              formMethods.setValue('destination_state', suggestion.stateCode);
                              formMethods.setValue('destination_city', suggestion.cityName);
                              formMethods.setValue('destination_post_code', suggestion.postalCode);
                              formMethods.clearErrors('destination_city');
                              formMethods.clearErrors('destination_state');
                            }}
                        />
                          <InputText
                              id="destination_state"
                              label="State"
                              placeholder="state"
                              validation={{ required: "Required Field" }}
                          />
                          <InputText
                              id="destination_city"
                              label="City"
                              placeholder="city"
                              validation={{ required: "Required Field" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-full h-px -mt-8 border-b border-dashed border-light-gray"></div>
            <div className="quote__secondRow">
              <LoadInformationInputs {...{ commodities, packageTypes }} />
            </div>
            <ExtraOptions {...{ accessorials, setIsInsuranceInclude }} />
            <Button id="btn" label="get pricing" />
          </form>
        </FormProvider>
      </Container>
  );
};