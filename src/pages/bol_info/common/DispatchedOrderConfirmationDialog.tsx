import { MdCancel } from "react-icons/md";

export const DispatchedOrderConfirmationDialog = (props: any) => {

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
              DISPATCH SHIPMENT ORDER
            </h5>
            <MdCancel
              onClick={props.onDialogClose}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
          <div className="modal-body relative p-4 border-b-[1px] border-dotted border-gray-400">
            <div>
              <label className="text-blue-1">
                GREAT, YOUR ORDER HAS BEEN DISPATCHED
              </label>
            </div>
          <div className="pb-5 w-full justify-center flex gap-16 mt-20">
            <button
                type="button"
                className="btn btn-primary relative w-48 h-16 justify-center text-center border border-solid border-blue-1 rounded-md text-blue-1 bg-white"
              >
                <div className="w-full justify-center gap-3 flex mt-5"  onClick={() => {props.onDialogClose()}}>
                  <label className="mb-4 text-lg relative text-center cursor-pointer">
                    CLOSE
                  </label>
                </div>
              </button>
              <button
                type="button"
                className="btn btn-primary relative border w-40 h-16 justify-center text-center rounded-md text-white bg-green-1"
              >
                <div
                  className="w-full justify-center gap-3 flex mt-5"
                  onClick={props.onViewBol}
                >
                  <label className="mb-4 text-lg text-start cursor-pointer">
                    VIEW BOL
                  </label>
                </div>
              </button>
            </div>          </div>
        </div>
      </div>
    </div>
  );
};
