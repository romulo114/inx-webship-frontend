import React from "react";
import { BreadNav } from "components/common/breadcrumb/BreadNav";
import { Breadcrumb } from "components/common/breadcrumb/Breadcrumb";
import { SavedQuotesController } from "./SavedQuotesController";

export const SavedQuotes = () => {
    return (
        <div>
            <Breadcrumb title="Saved Quotes" />
            <BreadNav />
            <SavedQuotesController />
        </div>
    )
}