import React, { useEffect, useState } from "react";
import { MdEmail, MdCancel, MdLocationPin } from "react-icons/md";
import { FaBuilding, FaSearch } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import "../../../assets/sass/components/inputNoBorderStyles.css";
import { CheckBox } from "../../../components/bol_components/CheckBox";
import { getAddressBookData } from "../api/bol_api";
import { AddressBookEntry } from "../constants/BOLConstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/globalstore";
import { UPDATE_ADDRESS_BOOK_DATA } from "actions";

export const Overlay = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed w-full h-full z-[100] top-0 left-0 
    opacity-30 overflow-y-hidden bg-gray-500"
    ></div>
  );
};

export const AddressBookDialog = (props: any) => {
  let [searchText, setSearchTextState] = useState("");
  let [checkedAddress, setCheckedAddress] = useState<AddressBookEntry | null>(
    null
  );
  
  const addressBookData = useSelector(
    (state: RootState) => state.bolInfoReducer.addressBookData
  );
  const [filteredAddressBookData, setFilteredAddressBookData] = useState([]);

  const setSearchText = (text: string) => {
    setSearchTextState(text);
    setFilteredAddressBookData(addressBookData.filter(
      (item: AddressBookEntry) =>
        `${item.contactName} ${item.companyName} ${item.email} ${item.address1}
      ${item.address2} ${item.phone}`
          .toLowerCase()
          .indexOf(text.toLowerCase()) !== -1
    ));
  }

  useEffect(() => {
    setFilteredAddressBookData(addressBookData);
  }, [addressBookData])

  const dispatch = useDispatch();
  useEffect(() => {
    if (addressBookData.length === 0) {
      getAddressBookData().then((response: any) => {
        dispatch({
          type: UPDATE_ADDRESS_BOOK_DATA,
          payload: response,
        });
      });
    }
  });

  return (
    <div
      className="z-[1000] justify-center items-center flex modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog w-[300px] relative">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header bg-green-1 flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-white"
              id="exampleModalLabel"
            >
              ADDRESS BOOK
            </h5>
            <MdCancel
              onClick={props.onDialogClose}
              className="text-white bg-green-1 text-5xl cursor-pointer"
            />
          </div>
          <div className="modal-body relative p-4 border-b-[1px] border-dotted border-gray-400">
            <div className="grid grid-cols-12 bg-gray-200">
              <div className="col-span-1">
                <FaSearch className="w-5 h-5 mt-2 ml-3" />
              </div>

              <div className="col-span-11 searchAreaContainer">
                <input
                  className="w-full border-0 bg-gray-200 text-2xl focus:outline-none
                  focus:border-none focus:shadow-none"
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            className="modal-body2 relative p-4 h-[300px] mt-2 mb-2
           overflow-y-auto"
          >
            {filteredAddressBookData.map(
              (address: AddressBookEntry, index: number) => (
                <div
                  key={index}
                  className={`grid grid-cols-12 p-5 mb-5 
                ${
                  checkedAddress && address.addressBookAddressId === checkedAddress.addressBookAddressId
                    ? "border-green-1 border-[1px] border-solid rounded-lg"
                    : "border-none"
                }`}
                >
                  <div className="col-span-11">
                    <div className="font-bold text-lg">
                      {address["contactName"]}
                    </div>
                    <div className="">
                      <FaBuilding className="inline" />
                      <label className="inline text-lg">
                        {address["companyName"]}
                      </label>
                    </div>
                    <div className="">
                      <MdLocationPin className="inline" />
                      <label className="inline text-base">
                        {`${address["address1"]}, ${address["address2"]}, 
                        ${address["postalCode"]}, ${address["stateCode"]}, ${address["city"]}`}
                      </label>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <MdEmail className="inline" />
                        <label className="text-lg">{address["email"]}</label>
                      </div>
                      <div className="col-span-1">
                        <BsFillTelephoneFill className="inline" />
                        <label className="text-lg">{address["phone"]}</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <CheckBox
                      checked={
                        checkedAddress && checkedAddress.addressBookAddressId === address.addressBookAddressId
                          ? true
                          : false
                      }
                      onChange={() => {
                        if (
                          checkedAddress &&
                          checkedAddress.addressBookAddressId === address.addressBookAddressId
                        ) {
                          setCheckedAddress(null);
                        } else {
                          setCheckedAddress(address);
                        }
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div
            className="flex col-span-6 pl-10  justify-between
            border-t-[1px] border-dotted border-gray-400"
          >
            <div className="col-span-2 m-2">
              <label className="text-base font-bold text-black"> 
                USE THIS ADDRESS AS:
              </label>
            </div>
            <div className="col-span-4 m-2 md:mr-10 sm:mr-10">
              <div className="gap-5 flex">
                {!props.fromShipperForm && <button
                  type="button"
                  className={`px-6 py-2.5 font-medium text-base leading-tight uppercase ml-1
                   bg-white text-green-1 underline border-none`}
                   onClick={() => {
                    if (checkedAddress)
                      props.onClick(props.isShipper, checkedAddress);
                  }}
                >
                  {`${props.isShipper ? "Sender" : " Receiver"}`}
                </button>}
                <button
                  type="button"
                  className={`px-6 py-2.5 leading-tight uppercase font-medium text-base ml-1
                   bg-green-1 text-white rounded shadow-md transition
                    duration-150 ease-in-out`}
                  onClick={() => {
                    if (checkedAddress)
                      props.onClick(!props.isShipper, checkedAddress);
                  }}
                >
                  {`${props.isShipper ? "Receiver" : "Sender"}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
