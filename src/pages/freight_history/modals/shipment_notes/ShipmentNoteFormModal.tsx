import { useCallback } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { IShipmentNoteData } from "./ShipmentNoteTypes";
import {useSaveShipmentNote} from "./ShipmentNoteQueries";
import InputText from "components/forms/InputText";
import InputTextArea from "components/forms/InputTextArea";
import RadioButtons from "components/forms/RadioButtons";
import InputFile from "../../../../components/forms/InputFile";
import { useDispatch } from "react-redux";
import { CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL } from "actions";

interface PropTypes {
    dlgShipmentNote: IShipmentNoteData;
    bolNumber: number,
    shipmentId: number
}

export const ShipmentNoteFormModal = ({ dlgShipmentNote, bolNumber, shipmentId }: PropTypes) => {
    const dispatch = useDispatch();

    const closeModal = useCallback(()=> {
        dispatch({
            type: CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL,
            payload: {
                addNoteModal: false,
            }
        })
    }, [dispatch])

    const {mutate: saveShipmentNote} = useSaveShipmentNote(() => {
        closeModal();
    });

    const formMethods = useForm<IShipmentNoteData>({
        defaultValues: dlgShipmentNote,
    });

    const onSubmit: SubmitHandler<IShipmentNoteData> = (data: any) => {
        const fdata = new FormData();
        const newData: any = {
            model: {
                shipmentId: shipmentId
            }
        }

        for (const key in data) {
            if (key !== 'file') {
                newData['model'][key] = data[key]
            }
        }

        for (const key in newData) {
            fdata.append(key, JSON.stringify(newData[key]))
        }

        saveShipmentNote(fdata);
    };

    return (
        <div className="fixed overflow-visible w-full h-full z-50 bg-gray-modal bottom-0 left-0">
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className="w-2/5 absolute overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col items-center">
                        <div className="bg-green-1 flex items-center justify-between w-full p-4 rounded-t-xl">
                            <div className="uppercase text-white">shipment notes</div>
                            <MdCancel
                                onClick={closeModal}
                                size="1.2em"
                                className="text-white bg-green-1 text-5xl cursor-pointer"
                            />
                        </div>
                        <div className="bg-white flex-1 w-full flex flex-col items-center rounded-b-xl">
                            <div
                                className="py-12 px-10 w-full flex flex-col items-center"
                            >
                                <div className="w-full flex items-center justify-between">
                                    <div className="uppercase text-blue-1 font-medium text-3xl">
                                        for bol#:
                                        <span className="text-green-1 ml-2">{bolNumber}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <BsFillBellFill color="#65b32d" size={"2.4rem"} />
                                        <div className="text-blue-1 text-sxsl uppercase ml-4 font-medium italic">
                                            new note
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-24 border border-solid border-lighter-gray rounded-3xl w-full pt-8 pb-3 px-6">


                                    <div className="flex items-center my-2">
                                        <div className="w-1/6 text-blue-1 text-sbase font-medium uppercase">
                                            Note Tile
                                        </div>
                                        <div className="flex-1">
                                            <InputText
                                                id={`title`}
                                                placeholder="Shipment Note Tile"
                                                validation={{required:'Required Field'}}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center my-2">
                                        <div className="w-1/6 text-blue-1 text-sbase font-medium uppercase">
                                            status:
                                        </div>
                                        <div className="flex-1 h-[40px] flex items-center pl-8 space-x-5">

                                            <RadioButtons
                                                id={`public`}
                                                options={[
                                                    { value: "false", label: 'Private' },
                                                    { value: "true", label: 'Public' },
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center my-2">
                                        <div className="w-1/6 text-blue-1 text-sbase font-medium uppercase">
                                            File
                                        </div>
                                        <div className="flex-1">
                                            <InputFile
                                                id={`file`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center my-2">
                                        <div className="w-1/6 text-blue-1 text-sbase font-medium uppercase">
                                            Message
                                        </div>
                                        <div className="flex-1">
                                            <InputTextArea
                                                id={`message`}
                                                rows={5}
                                                placeholder="Shipment Note Message"
                                                validation={{required:'Required Field'}}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-1 text-[rgba(255,255,255,.8)] uppercase px-7 py-6 cursor-pointer mt-20 mb-6 rounded-lg flex items-center justify-center">
                                    save note
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};