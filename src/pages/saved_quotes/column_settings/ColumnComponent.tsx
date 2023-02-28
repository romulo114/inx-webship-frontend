import {DeliveryDateColumn} from "../columns/DeliveryDateColumn";
import {QuoteIdColumn} from "../columns/QuoteIdColumn"
import {QuoteNumberColumn} from '../columns/QuoteNumberColumn'
import {OriginColumn} from "../columns/OriginColumn"
import {HandlingUnitsColumn} from "../columns/HandlingUnitsColumn"
import {DestinationColumn} from "../columns/DestinationColumn"
import {DimsColumn} from "../columns/DimsColumn"
import {WeightColumn} from "../columns/WeightColumn";
import {AccessorialColumn} from "../columns/AccessorialColumn"
import {InsuranceColumn} from "../columns/InsuranceColumn"
import {CarrierColumn} from "../columns/CarrierColumn";
import {ServiceColumn} from "../columns/ServiceColumn"
import {TransitTimeColumn} from "../columns/TransitTimeColumn"
import {PriceColumn} from "../columns/PriceColumn"
interface PropTypes {
    cellContext: any,
    name: string,
}

export const ColumnComponent = ({cellContext, name}: PropTypes) => {
    switch (name) {
        case 'quoteId':
            return <QuoteIdColumn cellContext={cellContext} />
        case 'quoteNumber':
            return <QuoteNumberColumn cellContext={cellContext} />
        case 'origin':
            return <OriginColumn cellContext={cellContext} />
        case 'handlingUnits':
            return <HandlingUnitsColumn cellContext={cellContext} />
        case 'destination':
            return <DestinationColumn cellContext={cellContext} />
        case 'dims':
            return <DimsColumn cellContext={cellContext} />
        case 'weight':
            return <WeightColumn cellContext={cellContext} />
        case 'accessorial':
            return <AccessorialColumn cellContext={cellContext} />
        case 'insurance':
            return <InsuranceColumn  cellContext={ cellContext } />
        case 'carrier':
            return <CarrierColumn  cellContext={ cellContext } />
        case 'service':
            return <ServiceColumn cellContext={cellContext} />
        case 'transitTime':
            return <TransitTimeColumn cellContext={cellContext} />
        case 'date':
            return <DeliveryDateColumn cellContext={cellContext} />
        case 'price':
            return <PriceColumn cellContext={ cellContext } />
        default:
            return <></>
    }
}