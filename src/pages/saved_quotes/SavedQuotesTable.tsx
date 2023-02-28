import {useState, useCallback} from "react";
import { flexRender, Table} from '@tanstack/react-table'
import { TiArrowSortedUp, TiArrowSortedDown } from  "react-icons/ti";
import { ShipmentTypes} from "./SavedQuotesTypes";
import { CHANGE_COLUMN_ORDER_SAVED_QUOTES } from "actions";
import { useDispatch } from "react-redux";
interface PropTypes {
    table: Table<ShipmentTypes>;
    openFilter?: Boolean;
}

export const SavedQuotesTable = ({ table, openFilter = false } : PropTypes) => {
    const dispatch = useDispatch();

    const [from, setFrom] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const startDragging = (from: string) => {
        setIsDragging(true);
        setFrom(from);
    }
    const changeColumnOrder = useCallback((to: string) => {
        if (to === from) return
        if (from == null) return null
        dispatch({
            type: CHANGE_COLUMN_ORDER_SAVED_QUOTES,
            moving: {
                from: from,
                to: to
            }
        })
        setIsDragging(false);
    }, [dispatch, from])
    return (
        <table className={`mt-15 mb-44 transition-all duration-200  ${openFilter ? 'ml-[25%] w-3/4': 'w-full'}`}>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className={'h-36 bg-lightest-gray'}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}
                            className={`relative text-center uppercase px-8 after:content-[''] after:border-r after:border-dashed after:border-light-gray after:absolute after:h-1/2 after:top-1/2 after:right-0 after:-translate-y-1/2 cursor-move ${isDragging && header.id === from? 'w-40 opacity-50':'w-52'}`}
                            onDragOver={(e) => {e.preventDefault()}}
                            onDragStart={()=>startDragging(header.id)}
                            onDragLeave={()=>changeColumnOrder(header.id)}
                            draggable="true"
                        >
                            <div
                                className={`flex items-center select-none ${header.column.getCanSort() ? 'cursor-pointer select-none' : '' }`}
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {{
                                    asc: <TiArrowSortedUp size="1.2em"/>,
                                    desc: <TiArrowSortedDown size="1.2em"/>,
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody className="border-[0.5px] border-solid border-lighter-gray">
            {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={'h-56'}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="border-solid border-0 border-t relative overflow-visible">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}