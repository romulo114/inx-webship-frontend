import { ImBook } from "react-icons/im"
import { FreightHistoryFilterItem } from "../FreightHistoryFilterItem"

export const SubFilterOtherOptions = () => {
    return (
        <>
            <div className="flex items-center w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 pl-10 space-x-4 mb-6">
                <ImBook size='1.5em' color="#0c214c"/>
                <div>other options</div>
            </div>
            <div className="flex flex-row flex-wrap pl-10 pb-8 space-x-4">
                <FreightHistoryFilterItem label="Display Insured Shipments" activated={true} />
                <FreightHistoryFilterItem label="Inspected Shipments" />
                <FreightHistoryFilterItem label="Hot Shipments" />
            </div>
        </>
    )
}