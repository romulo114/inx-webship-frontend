import React, { useEffect, useState } from "react";
import { Breadcrumb } from "components/common/breadcrumb/Breadcrumb";
import ShipperForm from "./bol_form/ShipperForm";
import { ReferenceInfoWrapper } from "./bol_form/ReferenceInfoWrapper";
import { ShippmentDetails } from "./bol_form/ShippmentDetails";
import { MarshAndOtherDetails } from "./bol_form/MarshAndOtherDetails";
import ProgressBar from "./common/ProgressBar";
import { SaveDispatch } from "./bol_form/SaveDispatchButtonFunctionality";

const MAX_MOBILE_SCREEN_WIDTH = 768;

interface PropTypes {
  isBolDetail?: boolean,
  isBolMenu?: boolean,
  setAddressUpdInfo?: Function;
}

export const BOLInfo = ({isBolDetail, isBolMenu, setAddressUpdInfo}: PropTypes) => {
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= MAX_MOBILE_SCREEN_WIDTH
  );

  useEffect(() => {
    function checkForWindowResize() {
      if (window.innerWidth <= MAX_MOBILE_SCREEN_WIDTH) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }

    window.addEventListener("resize", checkForWindowResize);
  });

  return (
    <>
      {!isBolDetail && <Breadcrumb title="Bill of Lading Information" />}
      <div className="grid grid-cols-12">
        {!isBolDetail && !isMobileView && (
          <div className="col-span-2">
            <ProgressBar />
          </div>
        )}

        <div className={`${isBolDetail || isMobileView ? "col-span-12" : "col-span-10 w-11/12"}`}>
          
          <ShipperForm setAddressUpdInfo={setAddressUpdInfo}
            isBolDetail={isBolDetail} isBolMenu={isBolMenu} />
          <ReferenceInfoWrapper isBolDetail={isBolDetail} isBolMenu={isBolMenu} />
          <ShippmentDetails isBolDetail={isBolDetail} isBolMenu={isBolMenu} />
          <MarshAndOtherDetails isBolDetail={isBolDetail} isBolMenu={isBolMenu} />
          <SaveDispatch />
        </div>
      </div>
    </>
  );
};
