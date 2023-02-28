import { cloneDeep } from 'lodash';
import { AnyAction } from "@reduxjs/toolkit";
import {freightHistoryColumnSettings} from '../pages/freight_history/column_settings/FreightHistoryColumnSettings';
import {
    CLOSE_SHIPMENT_NOTES_MODAL,
    OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL,
    CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL,
    CLOSE_SHIPMENT_DETAILS_MODAL,
    OPEN_SHIPMENT_DETAILS_MODAL,
    OPEN_DISPATCH_MENU_DIALOG_MODAL,
    CLOSE_DISPATCH_MENU_DIALOG_MODAL,
    OPEN_SCHEDULE_PICKUP_DIALOG_MODAL,
    CLOSE_SCHEDULE_PICKUP_DIALOG_MODAL,
    OPEN_BOL_DETAIL_MODAL,
    CLOSE_BOL_DETAIL_MODAL,
    OPEN_TRACKING_SHIPMENT_MODAL,
    CLOSE_TRACKING_SHIPMENT_MODAL,
    OPEN_VOID_SHIPMENT_MODAL,
    CLOSE_VOID_SHIPMENT_MODAL,
    OPEN_SHIPMENT_NOTES_MODAL,
    TOGGLE_VIEW_COLUMN_SETTING,
    RESTORE_COLUMN_SETTING,
    CHANGE_COLUMN_ORDER_FREIGHT_HISTORY
} from "actions";

let clonedFreightHistoryColumnSettings = cloneDeep(freightHistoryColumnSettings);

interface IFreightHistory {
    actionModal: {
        shipmentDetailsDialog: {
            isShipmentDetailsDialogOpen: boolean,
            row: any
        },
        dispatchMenuDialog: {
            showDispatchMenuDialog: boolean,
            row: any
        },
        schedulePickUpDialog: {
            showShedulePickupDialog: boolean,
            row: any
        },
        bolDetailModal: {
            showInfoBol: boolean,
            row: any
        },
        trackingShipmentModal: {
            showTrackingDialog: boolean,
            row: any
        },
        shipmentNotesModal: {
            isOpen: boolean
            row: any
            addNoteModal: boolean
        },
        voidShipmentModal: {
            isCancelShipmentOpen: boolean,
            row: any
        }
    },

    columnsSetting: any
}

const columnsSetting = typeof localStorage.getItem('columnsSetting') === 'string' ? JSON.parse(localStorage.getItem('columnsSetting') || '') : '';

const initialState: IFreightHistory = {
    actionModal: {
        shipmentDetailsDialog: {
            isShipmentDetailsDialogOpen: false,
            row: {}
        },
        dispatchMenuDialog: {
            showDispatchMenuDialog: false,
            row: {}
        },
        schedulePickUpDialog: {
            showShedulePickupDialog: false,
            row: {}
        },
        bolDetailModal: {
            showInfoBol: false,
            row: {}
        },
        trackingShipmentModal: {
            showTrackingDialog: false,
            row: {}
        },
        shipmentNotesModal: {
            isOpen: false,
            row: {},
            addNoteModal: false
        },
        voidShipmentModal: {
            isCancelShipmentOpen: false,
            row: {}
        }
    },

    columnsSetting: columnsSetting ? columnsSetting : clonedFreightHistoryColumnSettings
}

export const freightHistoryInfoReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        // modal Reducer
        case OPEN_SHIPMENT_NOTES_MODAL:
        case CLOSE_SHIPMENT_NOTES_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    shipmentNotesModal: {
                        ...state.actionModal.shipmentNotesModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_SHIPMENT_NOTES_ADD_NOTES_MODAL:
        case CLOSE_SHIPMENT_NOTES_ADD_NOTES_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    shipmentNotesModal: {
                        ...state.actionModal.shipmentNotesModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_SHIPMENT_DETAILS_MODAL:
        case CLOSE_SHIPMENT_DETAILS_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    shipmentDetailsDialog: {
                        ...state.actionModal.shipmentDetailsDialog,
                        ...action.payload
                    }
                }
            }
        case OPEN_DISPATCH_MENU_DIALOG_MODAL:
        case CLOSE_DISPATCH_MENU_DIALOG_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    dispatchMenuDialog: {
                        ...state.actionModal.dispatchMenuDialog,
                        ...action.payload
                    }
                }
            }
        case OPEN_SCHEDULE_PICKUP_DIALOG_MODAL:
        case CLOSE_SCHEDULE_PICKUP_DIALOG_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    schedulePickUpDialog: {
                        ...state.actionModal.schedulePickUpDialog,
                        ...action.payload
                    }
                }
            }
        case OPEN_BOL_DETAIL_MODAL:
        case CLOSE_BOL_DETAIL_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    bolDetailModal: {
                        ...state.actionModal.bolDetailModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_TRACKING_SHIPMENT_MODAL:
        case CLOSE_TRACKING_SHIPMENT_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    trackingShipmentModal: {
                        ...state.actionModal.trackingShipmentModal,
                        ...action.payload
                    }
                }
            }
        case OPEN_VOID_SHIPMENT_MODAL:
        case CLOSE_VOID_SHIPMENT_MODAL:
            return {
                ...state,
                actionModal: {
                    ...state.actionModal,
                    voidShipmentModal: {
                        ...state.actionModal.voidShipmentModal,
                        ...action.payload
                    }
                }
            }
        // columnSetting Reducer
        case TOGGLE_VIEW_COLUMN_SETTING:
            state.columnsSetting.forEach((colSet: any)=> {
                if (colSet.label === action.payload.label) {
                    colSet.is_active = !colSet.is_active
                }
            })

            localStorage.setItem('columnsSetting', JSON.stringify(state.columnsSetting));

            return {
                ...state,
                columnsSetting: [
                    ...state.columnsSetting
                ]
            }
        case RESTORE_COLUMN_SETTING:
            clonedFreightHistoryColumnSettings = cloneDeep(freightHistoryColumnSettings);
            localStorage.setItem('columnsSetting', JSON.stringify(clonedFreightHistoryColumnSettings));

            return {
                ...state,
                columnsSetting: clonedFreightHistoryColumnSettings
            }
        case CHANGE_COLUMN_ORDER_FREIGHT_HISTORY:
            let {from, to} = action.moving;
            let fromId = state.columnsSetting.findIndex((item: any) => item.column === from)
            let toId = state.columnsSetting.findIndex((item: any) => item.column === to)
            
            let temp = 0;
            if (fromId > toId) {
                temp = fromId;
                fromId = toId;
                toId = temp;
            }

            const arr = [
                ...state.columnsSetting.slice(0, fromId), 
                state.columnsSetting[toId], 
                ...state.columnsSetting.slice(fromId + 1, toId), 
                state.columnsSetting[fromId], 
                ...state.columnsSetting.slice(toId + 1)
            ]
            
            localStorage.setItem('columnsSetting', JSON.stringify(arr));
            return {
                ...state,
                columnsSetting: [...arr]
            }
        default:
            return {
                ...state,
            };
    }
};
