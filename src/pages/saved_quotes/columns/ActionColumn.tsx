import { useCallback } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { ReQuoteMenu } from "../action_menus/ReQuoteMenu";
import { PrintDocumentsMenu } from "../action_menus/PrintDocumentsMenu";
import { DeleteQuoteMenu } from "../action_menus/DeleteQuoteMenu";
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

    const actionMenu = {
        printDocuments:     {label: 'Print Documents',  is_active: true},
        reQuote:            {label: 'Re-quote',         is_active: true},
        deleteQuote:        {label: 'Delete Quote',     is_active: true},
    }
    
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
                    className="absolute w-[150px] bg-lightest-gray border border-solid border-light-gray z-10 top-30 rounded"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={'menu-button' + rowId}
                    tabIndex={-1}
                >

                    <div className="">

                        <PrintDocumentsMenu {...{ row, options: actionMenu.printDocuments }} />

                        <ReQuoteMenu {...{ setHIndex, row, options: actionMenu.reQuote }} />

                        <DeleteQuoteMenu {...{ row, options: actionMenu.deleteQuote }} />
                    </div>

                </div>
            }
        </div>
    );
};