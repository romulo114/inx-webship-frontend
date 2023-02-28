import React, { useCallback, useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { ReQuoteMenu } from "../action_menus/ReQuoteMenu";
import { ViewShipmentsMenu } from "../action_menus/ViewShipmentsMenu";
import { DispatchMenu } from "../action_menus/DispatchMenu";
import { PrintDocumentsMenu } from "../action_menus/PrintDocumentsMenu";
import { SchedulePickupMenu } from "../action_menus/SchedulePickupMenu";
import { SendDocumentsMenu } from "../action_menus/SendDocumentsMenu";
import { BolDetailsMenu } from "../action_menus/BolDetailsMenu";
import { UploadDocumentsMenu } from "../action_menus/UploadDocumentsMenu";
import { TrackingMenu } from "../action_menus/TrackingMenu";
import { HotShipmentMenu } from "../action_menus/HotShipmentMenu";
import { CancelShipmentMenu } from "../action_menus/CancelShipmentMenu";
import { ShipmentNotesMenu } from "../action_menus/ShipmentNotesMenu";
import { AddTagNameMenu } from "../action_menus/AddTagNameMenu";
import useComponentVisible from "utils/hooks";

interface PropTypes {
    hIndex: number;
    setHIndex: Function;
    row: any;
}

export const ActionColumn = ({ hIndex, setHIndex, row }: PropTypes) => {

    const rowId = Number(row.id);
    const { ref } = useComponentVisible(hIndex, setHIndex, rowId);

    const actionBtnClick = useCallback(() => {
        if (hIndex === rowId) {
            setHIndex(-1)
        } else {
            setHIndex(rowId)
        }
    }, [hIndex, rowId, setHIndex])

    const [actionMenu, setActionMenu] = useState({
        viewShipments:      {label: 'View Shipments',   is_active: true},
        dispatch:           {label: 'Dispatch',         is_active: true},
        printDocuments:     {label: 'Print Documents',  is_active: true},
        reQuote:            {label: 'Re-quote',         is_active: true},
        schedulePickup:     {label: 'Schedule pickup',  is_active: true},
        sendDocuments:      {label: 'Send documents',   is_active: true},
        bolDetails:         {label: 'BOL details',      is_active: true},
        uploadDocuments:    {label: 'Upload documents', is_active: true},
        tracking:           {label: 'Tracking',         is_active: true},
        hotShipment:        {label: 'Hot Shipment',     is_active: true},
        cancelShipment:     {label: 'Cancel shipment',  is_active: true},
        shipmentNotes:      {label: 'Shipment notes',   is_active: true},
    })

    useEffect(() => {
        let updatedActionMenu
        switch (row.original.statusEnumName) {
            case 'PENDING':
                updatedActionMenu = {
                    ...actionMenu,
                    schedulePickup: {
                        label: actionMenu.schedulePickup.label, is_active: false
                    },
                    printDocuments: {
                        label: actionMenu.printDocuments.label, is_active: false
                    },
                    sendDocuments: {
                        label: actionMenu.sendDocuments.label, is_active: false
                    },
                    bolDetails: {
                        label: actionMenu.bolDetails.label, is_active: false
                    },
                    tracking: {
                        label: actionMenu.tracking.label, is_active: false
                    },
                    cancelShipment: {
                        label: 'Void Shipment', is_active: actionMenu.cancelShipment.is_active
                    }

                }
            break
            case 'PENDING_PICKUP':
                updatedActionMenu = {
                    ...actionMenu, 
                    printDocuments: {
                        label: actionMenu.printDocuments.label, is_active: false
                    },
                    schedulePickup: {
                        label: actionMenu.schedulePickup.label, is_active: false
                    },
                    sendDocuments: {
                        label: actionMenu.sendDocuments.label, is_active: false
                    },
                    cancelShipment: {
                        label: 'Void Shipment', is_active: actionMenu.cancelShipment.is_active
                    }
                }
            break
            case 'PICKED_UP':
            case 'IN_TRANSIT':
                updatedActionMenu = {
                    ...actionMenu, 
                    dispatch: {
                        label: actionMenu.dispatch.label, is_active: false
                    },
                    schedulePickup: {
                        label: actionMenu.schedulePickup.label, is_active: false
                    },
                    bolDetails: {
                        label: 'View BOL', is_active: actionMenu.bolDetails.is_active
                    }
                }
            break
            case 'DELIVERED':
            case 'CANCELLED':
                updatedActionMenu = {
                    ...actionMenu, 
                    dispatch: {
                        label: actionMenu.dispatch.label, is_active: false
                    },
                    schedulePickup: {
                        label: actionMenu.schedulePickup.label, is_active: false
                    },
                    cancelShipment: {
                        label: actionMenu.cancelShipment.label, is_active: false
                    },
                    bolDetails: {
                        label: 'View BOL', is_active: actionMenu.bolDetails.is_active
                    }
                }
            break
            default:
                updatedActionMenu = {
                    ...actionMenu, 
                    dispatch: {
                        label: actionMenu.dispatch.label, is_active: false
                    },
                    printDocuments: {
                        label: actionMenu.printDocuments.label, is_active: false
                    },
                    schedulePickup: {
                        label: actionMenu.schedulePickup.label, is_active: false
                    },
                    sendDocuments: {
                        label: actionMenu.sendDocuments.label, is_active: false
                    },
                    bolDetails: {
                        label: actionMenu.bolDetails.label, is_active: false
                    },
                    uploadDocuments: {
                        label: actionMenu.uploadDocuments.label, is_active: false
                    },
                    tracking: {
                        label: actionMenu.tracking.label, is_active: false
                    },
                    hotShipment: {
                        label: actionMenu.hotShipment.label, is_active: false
                    },
                    shipmentNotes: {
                        label: actionMenu.shipmentNotes.label, is_active: false
                    },
                    cancelShipment: {
                        label: 'Void Shipment', is_active: false
                    }
                }
        }
        setActionMenu(updatedActionMenu)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [row.original.statusEnumName])

    return (
        <div ref={ref}>
            <div>
                <button
                    type="button"
                    className="relative min-w-[56px]"
                    onClick={actionBtnClick}
                    id={'menu-button' + rowId}
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <div
                        className={`flex items-center justify-between w-full px-4 py-1 cursor-pointer border border-solid border-blue-1 rounded ${(hIndex === rowId) ? 'transition-all duration-500 bg-green-1 text-white' : ''}`}
                    >
                        <div>{'Action'}</div>
                        <TiArrowSortedDown size="1.2em" />
                    </div>
                </button>
            </div>
            {(hIndex === rowId) &&
                <div
                    className="absolute w-[290px] bg-lightest-gray border border-solid border-light-gray z-10 top-30 left-10 rounded"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={'menu-button' + rowId}
                    tabIndex={-1}
                >

                    <div className="grid grid-cols-2 mx-2">

                        <ViewShipmentsMenu {...{ setHIndex, row, options: actionMenu.viewShipments }} />

                        <DispatchMenu {...{ setHIndex, row, options: actionMenu.dispatch }} />

                        <PrintDocumentsMenu {...{ setHIndex, row, options: actionMenu.printDocuments }} />

                        <ReQuoteMenu {...{ setHIndex, row, options: actionMenu.reQuote }} />

                        <SchedulePickupMenu {...{ setHIndex, row, options: actionMenu.schedulePickup }} />

                        <SendDocumentsMenu {...{ setHIndex, row, options: actionMenu.sendDocuments }} />

                        <BolDetailsMenu {...{ setHIndex, row, options: actionMenu.bolDetails }} />

                        <UploadDocumentsMenu {...{ setHIndex, row, options: actionMenu.uploadDocuments }} />

                        <TrackingMenu {...{ setHIndex, row, options: actionMenu.tracking }} />

                        <HotShipmentMenu {...{ setHIndex, row, options: actionMenu.hotShipment }} />

                        <ShipmentNotesMenu {...{ setHIndex, row, options: actionMenu.shipmentNotes }} />

                        <CancelShipmentMenu {...{ setHIndex, row, options: actionMenu.cancelShipment }} />

                    </div>

                    <AddTagNameMenu {...{ setHIndex, row }} />

                </div>
            }
        </div>
    );
};