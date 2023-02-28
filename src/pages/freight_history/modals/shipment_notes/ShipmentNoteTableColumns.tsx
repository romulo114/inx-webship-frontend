import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { IShipmentNote } from "./ShipmentNoteTypes";
import {FiEdit} from "react-icons/fi";
import {FaRegTrashAlt} from "react-icons/fa";
import {useDeleteShipmentNote} from "./ShipmentNoteQueries";

const columnHelper = createColumnHelper<IShipmentNote>()

export const ShipmentNoteTableColumns = (setDlgShipmentNote: Function, addNoteModalFun: Function) => {

    const {mutate: deleteShipmentNote} = useDeleteShipmentNote();

    const onDelete = (id: number) => {
        deleteShipmentNote(id);
    }

    const onEdit = (row: IShipmentNote) => {

        setDlgShipmentNote({
            id: row.id,
            title: row.title,
            message: row.message,
            public: row.public.toString(),
            shipmentId: row.shipmentId,
        })

        addNoteModalFun()
    }

    return [

        columnHelper.display({
            id: "title",
            header: () => 'Note',
            cell: (props) => {

                const row = props.row.original;

                return (
                    <>
                        <div className="text-[#262626]">{row.title}</div>
                        <div className="text-gray-2 mt-2">
                            <p>{row.message}</p>
                        </div>
                    </>
                )
            }
        }),

        columnHelper.accessor('createdDate', {
            header: () => (
                <div className="text-center">
                    Date
                </div>
            ),
            cell: info => (
                <div className={'text-gray-2 text-center'}>
                    {info.getValue()}
                </div>
            ),
        }),

        columnHelper.accessor('createdBy', {
            header: () => (
                <div className="text-center">
                    Created By
                </div>
            ),
            cell: info => (
                <div className={'text-gray-2 text-center'}>
                    {info.getValue()}
                </div>
            ),
        }),

        columnHelper.display({
            id: "action",
            header: () => 'ACTION',
            cell: (props) => {
                const row = props.row.original;
                return (
                    <>
                        <div className="flex items-center justify-center space-x-4">
                            {row.editable && <>
                                <FiEdit
                                size={"1.4em"}
                                className="cursor-pointer"
                                onClick={() => onEdit(row)}
                            />
                            <FaRegTrashAlt
                                color="#c6292a"
                                size={"1.4em"}
                                className="cursor-pointer"
                                onClick={ () => onDelete(row.id)}
                            /></>}
                        </div>
                    </>
                )
            }
        }),
    ];
}

