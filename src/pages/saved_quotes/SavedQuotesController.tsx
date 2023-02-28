import {useState} from "react";
import {tableColumns} from "./SavedQuotesTableColumns";
import {useSavedQuotes} from "./SavedQuotesQueries";
import {SavedQuotesTable} from "./SavedQuotesTable";
import {SavedQuotesPaginator} from "./SavedQuotesPaginator";
import {SavedQuotesTopOptions} from "./SavedQuotesTopOptions";
import {SavedQuotesFilter} from "./filter/SavedQuotesFilter";
import {getCoreRowModel, PaginationState, SortingState, useReactTable} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { IFilterQuery } from './filter/SavedQuotesFilterTypes';
import moment from "moment";
import { DeleteQuoteModal } from "./modals/DeleteQuoteModal";

export const SavedQuotesController = () => {
    const [hIndex, setHIndex] = useState(-1);
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10 });
    const [filterQuery, setFilterQuery] = useState<IFilterQuery>({
        quoteNumber: null,
        dateFrom: moment().subtract(30, 'day').format('YYYY-MM-DD'),
        dateTo: moment().add(10, 'day').format('YYYY-MM-DD'),
        carrierName: [],
        serviceName: [],
        statusName: []
    })
    const dataQuery = useSavedQuotes(sorting, pagination, filterQuery);
    const columnsSettingSQ = useSelector((state: RootState) => state.savedQuotesReducer.columnsSettingSQ);
    const table = useReactTable({
        data: dataQuery.data?.data ?? [],
        columns: tableColumns(hIndex, setHIndex, columnsSettingSQ),
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

    // state for delete Quote Modal
    const {isDeleteQuoteOpen, row: deleteSavedQuoteRow} = useSelector((state: RootState) => state.savedQuotesReducer.actionModal.deleteQuoteModal);

    const [openFilter, setOpenFilter] = useState<Boolean>(false);
    // state for reset paginator
    const [resetPaginator, setResetPaginator] = useState<Boolean>(false);
    return (
        <div className="mx-auto container">
            <div className="grid place-items-center">
                <SavedQuotesTopOptions
                    isFilterOpen={openFilter}
                    toggleFilter={(flag: Boolean) => setOpenFilter(flag)}
                    sorting={sorting}
                />
                <div className="flex relative w-full">
                    <SavedQuotesFilter
                        openFilter={openFilter}
                        setFilterQuery={setFilterQuery}
                        setResetPaginator={setResetPaginator}
                    />
                    <SavedQuotesTable
                        openFilter={openFilter}
                        table={table}
                    />
                </div>
                <SavedQuotesPaginator
                    table={table}
                    totalCount={dataQuery.data?.elementCount ?? 0}
                    resetPaginator={resetPaginator}
                    setResetPaginator={setResetPaginator}
                />
            </div>

            {/* Delete Quote Modal */}
            { isDeleteQuoteOpen && <DeleteQuoteModal row={deleteSavedQuoteRow} setHIndex={setHIndex} /> }
        </div>
    )
}