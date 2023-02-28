import { Routes, Route } from "react-router-dom";
import {Overview} from "pages/overview/Overview";
import {Faq} from "pages/faq/Faq";
import {FreightHistory} from "pages/freight_history/FreightHistory";
import {GetPricing} from "pages/get_pricing/GetPricing";
import {Reports} from "pages/reports/Reports";
import {Tools} from "pages/tools/Tools";
import {SavedQuotes} from "pages/saved_quotes/SavedQuotes";

/*
 * Here is where you can register routes for the application
 */
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Overview/>} />
            <Route path='overview' element={<Overview/>} />
            <Route path='freight_history' element={<FreightHistory/>} />
            <Route path='get_pricing'>
                <Route path='' element={<GetPricing/>} />
                <Route path='shipment/:dataId' element={<GetPricing/>} />
                <Route path='quote/:dataId' element={<GetPricing/>} />
            </Route>
            <Route path='reports' element={<Reports/>} />
            <Route path='tools' element={<Tools/>} />
            <Route path='saved_quotes' element={<SavedQuotes/>} />
            <Route path='faq' element={<Faq/>} />
        </Routes>
    )
}