import React from "react";
import { BreadNav } from "components/common/breadcrumb/BreadNav";
import { Breadcrumb } from "components/common/breadcrumb/Breadcrumb";
import { FreightHistoryController } from "./FreightHistoryController";

export const FreightHistory = () => {
    return (
        <div>
            <Breadcrumb title="Freight History" />
            <BreadNav />
            <FreightHistoryController />
        </div>
    )
}