import { useCallback } from 'react'
import { Datepicker } from "components/bol_components/DatePicker";
import { TimePicker } from "components/bol_components/TimePicker";
import moment from "moment";
import { useState } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updSchedulePickup } from "../api/bol_api";
import { CLOSE_SCHEDULE_PICKUP_DIALOG_MODAL } from 'actions';

export const SchedulePickUpDialog = (props: any) => {
  const dispatch = useDispatch();
  const closeSchedulePickupDialog = useCallback(()=> {
    dispatch({
      type: CLOSE_SCHEDULE_PICKUP_DIALOG_MODAL,
      payload: {
        showShedulePickupDialog: false
      }
    })
  }, [dispatch])
  const [pickupDetailsObj, setPickupDetailsObj] = useState({
    pickupDate: null,
    pickupReadyTime: null,
    pickupCloseTime: null,
  });

  const saveSchedulePickDetails = () => {
    updSchedulePickup(props.row.original.shipmentId, {
      pickupDate: moment
        .utc(pickupDetailsObj.pickupDate, "MM/DD/yyyy")
        .format(),
      pickupReadyTime: moment.utc(`
      ${pickupDetailsObj.pickupReadyTime}`,"HH:mm a").format("HH:mm:ss"),
      pickupCloseTime: moment.utc(` 
      ${pickupDetailsObj.pickupCloseTime}`,"HH:mm a").format("HH:mm:ss"),
    }).then(() => {
      closeSchedulePickupDialog();
    });
  };

  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-[300px] relative">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-[45rem] pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-2xl font-medium leading-normal text-white"
              id="exampleModalLabel"
            >
              SCHEDULE PICK-UP
            </h5>
            <MdCancel
              onClick={closeSchedulePickupDialog}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
          <div className="modal-body relative">
            <div className="m-20 border-[1px] border-solid border-green-1 rounded-md">
              <div className="w-full justify-start flex text-blue-1 mt-5 ml-5">
                <FaCalendarPlus />
                <label className="text-lg pl-2 font-bold">
                  PICK UP DETAILS
                </label>
              </div>
              <div className="w-full justify-center mt-10 text-blue-1 flex">
                <Datepicker
                  selectedDate={pickupDetailsObj.pickupDate}
                  onChange={(date: string) =>
                    setPickupDetailsObj((prev: any) => ({
                      ...prev,
                      pickupDate: date,
                    }))
                  }
                  isValidationTriggered={false}
                  minDate={true}
                />
              </div>
              <div className="w-full justify-center mt-10 mb-10 text-blue-1 gap-4 flex">
                <TimePicker
                  time={pickupDetailsObj.pickupReadyTime}
                  label={"Ready Time"}
                  onChange={(time: string) => {
                    setPickupDetailsObj((prev: any) => ({
                      ...prev,
                      pickupReadyTime: time,
                    }));
                  }}
                  isValidationTriggered={false}
                />

                <TimePicker
                  time={pickupDetailsObj.pickupCloseTime}
                  label={"Close Time"}
                  onChange={(time: string) => {
                    setPickupDetailsObj((prev: any) => ({
                      ...prev,
                      pickupCloseTime: time,
                    }));
                  }}
                  isValidationTriggered={false}
                />
              </div>
            </div>
            <div className="pb-5 w-full justify-center flex gap-16 mt-20">
            <button
                type="button"
                className="btn btn-primary relative w-48 h-16 justify-center text-center border border-solid border-blue-1 rounded-md text-blue-1 bg-white"
              >
                <div className="w-full justify-center gap-3 flex mt-5"  onClick={closeSchedulePickupDialog}>
                  <label className="mb-4 text-lg relative text-center cursor-pointer">
                    CANCEL
                  </label>
                </div>
              </button>
              <button
                type="button"
                className="btn btn-primary relative border w-40 h-16 justify-center text-center rounded-md text-white bg-green-1"
              >
                <div
                  className="w-full justify-center gap-3 flex mt-5"
                  onClick={saveSchedulePickDetails}
                >
                  <label className="mb-4 text-lg text-start cursor-pointer">
                    SAVE
                  </label>
                  <IoMdSave className="justify-items-end cursor-pointer" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
