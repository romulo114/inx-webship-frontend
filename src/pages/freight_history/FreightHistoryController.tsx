import {useState} from "react";
import {tableColumns} from "./FreightHistoryTableColumns";
import {useShipments} from "./FreightHistoryQueries";
import {FreightHistoryTable} from "./FreightHistoryTable";
import {FreightHistoryPaginator} from "./FreightHistoryPaginator";
import {FreightHistoryTopOptions} from "./FreightHistoryTopOptions";
import {FreightHistoryFilter} from "./filter/FreightHistoryFilter";
import {getCoreRowModel, PaginationState, SortingState, useReactTable} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "store/globalstore";

import { ShipmentNotesModal } from "./modals/shipment_notes/ShipmentNotesModal";
import { ShipmentNoteFormModal } from "./modals/shipment_notes/ShipmentNoteFormModal";
import { Overlay } from "pages/bol_info/common/AddressBookDialog";
import { ShipmentDetailsDialog } from "pages/bol_info/common/ShipmentDetailsDialog";
import { DispatchMenuWrapper } from "pages/bol_info/DispatchMenuWrapper";
import { SchedulePickUpDialog } from "pages/bol_info/common/SchedulePickUpDialog";
import { BOLDetails } from "pages/bol_info/BolDetails";
import { TrackingDialog } from "pages/bol_info/common/TrackingDialog";
import { CancelShipmentModal } from "./modals/CancelShipmentModal";
import { IShipmentNoteData } from "./modals/shipment_notes/ShipmentNoteTypes";
import { ShipmentNoteFormDefaultValues } from "./modals/shipment_notes/ShipmentNoteFormDefaultValues";
import { IFilterQuery } from './filter/FreightHistoryFilterTypes';
import moment from "moment";

export const FreightHistoryController = () => {
    const [hIndex, setHIndex] = useState(-1);
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10 });
    const [filterQuery, setFilterQuery] = useState<IFilterQuery>({
        byBolNumber: true,
        byProNumber: false,
        bolNumber: null,
        proNumber: null,
        bolProNumber: null,
        dateFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'),
        dateTo: moment().add(10, 'day').format('YYYY-MM-DD'),
        carrierName: [],
        serviceName: [],
        statusName: []
    })
    const dataQuery = useShipments(sorting, pagination, filterQuery);
    const columnsSetting = useSelector((state: RootState) => state.freightHistoryInfoReducer.columnsSetting);

    const table = useReactTable({
        data: dataQuery.data?.data ?? [],
        columns: tableColumns(hIndex, setHIndex, columnsSetting),
        pageCount: dataQuery.data?.pageCount ?? -1,
        state: {
            sorting,
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        manualSorting: true,
        manualPagination: true,
        debugTable: true,
    });
    
    // state for shipmentDetailsDialog
    const {isShipmentDetailsDialogOpen, row: shipmentDetailsRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.shipmentDetailsDialog);

    // state for dispatchMenuDialog
    const {showDispatchMenuDialog, row: dispatchMenuRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.dispatchMenuDialog);

    // state for schedulePickUpDialog
    const {showShedulePickupDialog, row: schedulePickUpRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.schedulePickUpDialog);

    // state for bolDetailModal
    const {showInfoBol, row: bolDetailRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.bolDetailModal);

    // state for trackingShipmentModal
    const {showTrackingDialog, row: trackingShipmentRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.trackingShipmentModal);

    // state for shipmentNotes
    const {isOpen, row, addNoteModal} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.shipmentNotesModal);

    // state for void Shipment Modal
    const {isCancelShipmentOpen, row: voidShipmentRow} = useSelector((state: RootState) => state.freightHistoryInfoReducer.actionModal.voidShipmentModal);

    const [dlgShipmentNote, setDlgShipmentNote] = useState<IShipmentNoteData>(
        ShipmentNoteFormDefaultValues(row)
    );

    const [openFilter, setOpenFilter] = useState<Boolean>(false);
    // state for reset paginator
    const [resetPaginator, setResetPaginator] = useState<Boolean>(false);
    return (
        <div className="mx-auto container">
            <div className="grid place-items-center">
                <FreightHistoryTopOptions
                    isFilterOpen={openFilter}
                    toggleFilter={(flag: Boolean) => setOpenFilter(flag)}
                    sorting={sorting}
                />
                <div className="flex relative w-full">
                    <FreightHistoryFilter
                        openFilter={openFilter}
                        setFilterQuery={setFilterQuery}
                        setResetPaginator={setResetPaginator}
                    />
                    <FreightHistoryTable
                        openFilter={openFilter}
                        table={table}
                    />
                </div>
                <FreightHistoryPaginator
                    table={table}
                    totalCount={dataQuery.data?.elementCount ?? 0}
                    resetPaginator={resetPaginator}
                    setResetPaginator={setResetPaginator}
                />
            </div>

            {/* View Shipments Modal */}
            {isShipmentDetailsDialogOpen && (
                <>
                    <Overlay />
                    <ShipmentDetailsDialog row={shipmentDetailsRow} />
                </>
            )}

            {/* Dispatch Menu */}
            {showDispatchMenuDialog && (
                <>
                    <Overlay />
                    <DispatchMenuWrapper
                        shipmentId={dispatchMenuRow.original.shipmentId}
                        bolNumber={dispatchMenuRow.original.customerBoLNumber}
                        proNumber={dispatchMenuRow.original.customerProNumber}
                    />
                </>
            )}

            {/* Schedule Pickup Modal */}
            {showShedulePickupDialog && (
                <>
                    <Overlay />
                    <SchedulePickUpDialog row={schedulePickUpRow} />
                </>
            )}

            {/* BOL Detail Modal */}
            {showInfoBol && (
                <>
                    <Overlay/>
                    <BOLDetails
                        shipmentId={bolDetailRow.original.shipmentId}
                        bolNumber={bolDetailRow.original.customerBoLNumber}
                        proNumber={bolDetailRow.original.customerProNumber}
                    />
                </>
            )}

            {showTrackingDialog && 
                <>          
                    <Overlay />
                    <TrackingDialog row={trackingShipmentRow} />
                </>
            }

            {/* Shipment Notes Modal */}
            { isOpen && <ShipmentNotesModal row={row} setDlgShipmentNote={setDlgShipmentNote}/>}

            {/* Add Notes Modal for ShipmentNotes Modal */}
            { addNoteModal && <ShipmentNoteFormModal
                bolNumber={row.original.issuedBoLNumber}
                dlgShipmentNote={dlgShipmentNote}
                shipmentId={row.original.shipmentId}
            />}

            {/* Void Shipment Modal */}
            { isCancelShipmentOpen && <CancelShipmentModal row={voidShipmentRow} setHIndex={setHIndex} /> }
        </div>
    )
}