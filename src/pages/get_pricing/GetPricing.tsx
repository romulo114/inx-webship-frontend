import {useState} from "react";
import {Breadcrumb} from "components/common/breadcrumb/Breadcrumb";
import {FilterForm} from "./filter_form/FilterForm";
import {QuotesResult} from "./quotes/QuotesResult";
import {isEmpty} from "lodash";
import {FilterFormTypes} from "./filter_form/FilterFormTypes";
import { useParams} from "react-router-dom";

export const GetPricing = () => {
    const [filters, setFilters] = useState<FilterFormTypes>({});
    const [isInsuranceInclude, setIsInsuranceInclude] = useState(false);
    let { dataId } = useParams();
    const [addressUpdInfo, setAddressUpdInfo] = useState<any>(null);

    return (
        <div className="quote">
            <Breadcrumb title="Get pricing"/>
            <FilterForm {...{setFilters, dataId, addressUpdInfo, setIsInsuranceInclude}}/>
            {!isEmpty(filters)
                && <QuotesResult {...{filters, setFilters, setAddressUpdInfo, isInsuranceInclude}}/>
            }
        </div>
    )
}