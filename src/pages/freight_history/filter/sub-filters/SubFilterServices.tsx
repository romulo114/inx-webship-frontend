import Dropdown from "components/forms/Dropdown"
import { MdOutlineHomeRepairService } from "react-icons/md"

export const SubFilterServices = ({services, formMethods, resetFilter, setResetFilter}: any) => {
    const { watch } = formMethods;
    const selectedServices = watch('serviceName');
    const options:any = [];
    services?.forEach((item: string)=> {
        options.push({
            label: item,
            value: item
        })
    })
    return (
        <>
            <div className="flex items-center justify-between w-full bg-lightest-gray uppercase font-extrabold py-6 text-blue-1 px-10">
                <div className="flex items-center space-x-4">
                    <MdOutlineHomeRepairService size='1.5em' color="#0c214c"/>
                    <div>services</div>
                </div>
                {selectedServices?.length > 0 && <span className="text-green-1">{selectedServices.length} selected</span>}
            </div>
            <div className="flex justify-center px-10 py-10">
                <Dropdown
                    placeholder="Select services name"
                    className="rounded-lg w-full"
                    id="serviceName"
                    options={options}
                    isMulti={true}
                    resetFilter={resetFilter}
                    setResetFilter={setResetFilter}
                />
            </div>
        </>
    )
}