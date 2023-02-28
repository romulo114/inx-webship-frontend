import React, {useCallback} from "react";
import { MdCancel } from "react-icons/md";
import { BsFillBellFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useShipmentNotes } from "./ShipmentNoteQueries";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {ShipmentNoteTableColumns} from "./ShipmentNoteTableColumns";
import ShipmentNoteTable from "./ShipmentNoteTable";
import { useDispatch } from "react-redux";
import { CLOSE_SHIPMENT_NOTES_MODAL, OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL } from "actions";
interface PropTypes {
    row: any;
    setDlgShipmentNote: Function
}

export const ShipmentNotesModal = ({ row, setDlgShipmentNote }: PropTypes) => {
    const dispatch = useDispatch();
    const addNoteModalFun = useCallback(() => {
        dispatch({
            type: OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL,
            payload: {
                addNoteModal: true,
                row: row
            }
        })
    }, [dispatch, row])
    const onShipmentNotesModalClose = useCallback(() => {
        dispatch({
            type: CLOSE_SHIPMENT_NOTES_MODAL,
            payload: {
                isOpen: false,
            }
        })
    }, [dispatch])

    const { data: shipmentNotes } = useShipmentNotes(row?.original?.shipmentId)

    const shipmentNotesTable = useReactTable({
        data: shipmentNotes ?? [],
        columns: ShipmentNoteTableColumns(setDlgShipmentNote, addNoteModalFun),
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="fixed overflow-visible w-full h-full z-50 bg-gray-modal bottom-0 left-0">
            <div className="w-1/2 absolute overflow-y-auto h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex flex-col items-center">
                <div className="bg-green-1 flex items-center justify-between w-full p-4 rounded-t-xl">
                    <div className="uppercase text-white">shipment notes</div>
                    <MdCancel
                        onClick={onShipmentNotesModalClose}
                        size="1.2em"
                        className="text-white bg-green-1 text-5xl cursor-pointer"
                    />
                </div>
                <div className="bg-white flex-1 w-full flex flex-col items-center rounded-b-xl">
                    <div className="py-12 px-10 flex items-center justify-between w-full">
                        <div className="uppercase text-blue-1 font-medium text-3xl">
                            for bol#:
                            <span className="text-green-1 ml-2">{row?.original?.issuedBoLNumber}</span>
                        </div>
                        <div className="flex items-center">
                            <BsFillBellFill color="#65b32d" size={'2.4rem'} />
                            <div className="text-blue-1 text-sxsl uppercase ml-4 font-medium italic">new note</div>
                        </div>
                    </div>
                    <div className="w-full my-2 px-12">
                        <div
                            className="mb-8 border border-dashed border-lighter-gray rounded-3xl w-full py-6 flex items-center justify-center cursor-pointer"
                            onClick={() => {
                                addNoteModalFun();
                                setDlgShipmentNote();
                            }}
                        >
                            <FaPlus color="#e3e1e2" size={'1.8em'}/>
                            <div className="uppercase text-2xl ml-6 font-medium">add note</div>
                        </div>
                    </div>
                    <div className="w-full overflow-auto h-[440px]">
                        <ShipmentNoteTable table={shipmentNotesTable} />
                    </div>
                    <div
                        className="bg-blue-1 text-[rgba(255,255,255,.8)] uppercase px-7 py-6 cursor-pointer my-6 rounded-lg flex items-center justify-center"
                        onClick={onShipmentNotesModalClose}
                    >
                        close
                    </div>
                </div>
            </div>
        </div>
    );
};