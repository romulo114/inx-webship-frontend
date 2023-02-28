import React, {useState} from 'react';
import { Container } from "components/common/container/Container";
import { FaTruckMoving } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { ImHammer2 } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { BsArrowRightSquare } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiOrganizationChart } from "react-icons/ri";
import { AiFillDollarCircle } from "react-icons/ai";
import { LottieCanvas } from "components/common/LottieCanvas";
import LottieTruck from "assets/animations/truck.json";
import {FilterFormTypes} from "../filter_form/FilterFormTypes";
import {QuoteTypes} from "./QuoteTypes";
import {isUndefined} from "lodash";

export interface PropTypes {
    filters: FilterFormTypes;
    data: QuoteTypes;
    showQuoteDetails: boolean;
}

export const QuoteDetails = ({ filters, showQuoteDetails, data }: PropTypes) => {
    const [showMore, setShowMore] = useState(true)

    if (!showQuoteDetails) {
        return null;
    }

    return (
        <div className={` ${!isUndefined(filters.insurance_amount) ? "md:min-h-[400px] h-[auto]" : "md:min-h-[250px] h-[auto]" } w-full transition-all duration-200 ease-in-out `}>
            <Container
                formClass="!gap-0"
                className="cursor-pointer border border-blue-1 border-solid rounded-xl !px-0">
                <div className="px-6">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="items-center hidden md:flex">
                            <FaTruckMoving size="2em" className="mr-6" />
                            <div className="text-sxl text-blue-1">{filters.origin_city},{filters.origin_state}</div>
                            <div
                                className="relative
                                           mb-8
                                           mx-24
                                           after:absolute
                                           after:content-['']
                                           after:left-20
                                           after:bottom-1/4
                                           after:w-16
                                           after:border-b after:border-dashed after:border-black
                                           before:absolute
                                           before:content-['']
                                           before:right-20
                                           before:bottom-1/4
                                           before:w-16
                                           before:border-b before:border-dashed before:border-black"
                            >
                                <LottieCanvas
                                    width={80}
                                    height={80}
                                    animationData={LottieTruck}
                                />
                            </div>
                            <div className="text-sxl text-blue-1">{filters.destination_city},{filters.destination_state}</div>
                        </div>
                        <div className="col-start-1">
                            <div className="flex items-center space-x-2 mt-2">
                                <FiTruck color="#65b32d" />
                                <div className="text-green-1">Carrier:</div>
                                <div className="text-sbase">{data.carrierName}</div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <ImHammer2 color="#65b32d" size="0.8em" />
                                <div className="text-green-1">Carrier rules:</div>
                                <div >-----</div>
                            </div>
                        </div>

                        <div >
                            <div className="flex items-center space-x-2 mt-2">
                                <MdEmail color="#65b32d" size="0.8em" />
                                <div className="text-green-1">Email address:</div>
                                <div >-----</div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <BsArrowRightSquare color="#65b32d" size="0.8em" />
                                <div className="text-green-1">Other:</div>
                                <div >-----</div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-10 relative">
                            <IoInformationCircleOutline
                                color="#000"
                                size="1.5em"
                                className="absolute left-0"
                            />
                            <div className="text-green-1 text-sbase mr-2">Description</div>
                            <div>
                                <p className={`text-blue-1 text-sbase  ${showMore ? ' text-ellipsis line-clamp-5' : ''}`}>{data.tariffDescription}</p>
                                <span className="text-green-1 block md:hidden" onClick={()=> {setShowMore(!showMore)}}>
                                    {
                                        showMore ? 'more': 'less'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !isUndefined(filters.accessorial) &&
                    <>
                        <div className="flex items-center mb-4 mx-6">
                            <RiOrganizationChart size="2em" />
                            <div className=" text-blue-1 md:text-4xl text-2xl ml-2">
                                {filters.accessorial.length} Accessorials
                            </div>
                        </div>

                        <div className="bg-lightest-gray w-full flex items-center pl-6 py-4 space-x-4">
                            {filters.accessorial.map((accessorial:any, index:number) => (
                                <div key={index} className="relative flex items-center rounded-smd px-10 md:py-4 py-2 text-blue-1 text-sbase font-medium bg-dark-gray">
                                    {accessorial.label}
                                </div>
                            ))}
                        </div>
                    </>
                }
                { !isUndefined(filters.insurance_amount) && <>
                <div className="items-center mb-4 mx-6 mt-16 hidden md:flex">
                    <AiFillDollarCircle size="2em"/>
                    <div className=" text-blue-1 text-4xl ml-2">
                        Total Description
                    </div>
                </div>                
                <table className="w-full hidden md:inline-grid">
                    <thead className="bg-lightest-gray">
                    <tr className="grid md:grid-cols-5 grid-cols-1 gap-4">
                        <th className="text-blue-1 text-sbase font-medium py-4 px-8">Insurance</th>
                        <th className="text-blue-1 text-sbase font-medium py-4 px-8">Commodities</th>
                        <th className="text-blue-1 text-sbase font-medium py-4 px-8">Package Categories</th>
                        <th className="text-blue-1 text-sbase font-medium py-4 px-8">Insured Amount</th>
                        <th className="text-blue-1 text-sbase font-medium py-4 px-8">Premium Amount</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr className="border-b border-lightest-gray text-center grid border-solid md:grid-cols-5 grid-cols-1 gap-4">
                        <td className="text-blue-1 text-sbase font-medium py-4 px-8">Marsh</td>
                        <td className="text-blue-1 text-sbase font-medium py-4 px-8">{filters.insurance_commodity?.value}</td>
                        <td className="text-blue-1 text-sbase font-medium py-4 px-8">{filters.insurance_package_category?.value}</td>
                        <td className="text-blue-1 text-sbase font-medium py-4 px-8">{filters.insurance_amount}</td>
                        <td className="text-blue-1 text-sbase font-medium py-4 px-8">{filters.insurance_amount}</td>
                    </tr>

                    <tr className="grid md:grid-cols-5 grid-cols-1 gap-4">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="py-4 text-right">SUBTOTAL</td>
                        <td className="1/8 text-center py-4">$200</td>
                    </tr>
                    </tbody>
                </table> </>}
            </Container>
        </div>
    );
};