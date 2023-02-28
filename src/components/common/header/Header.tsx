import {useState} from "react";
import {HeaderNavLink} from "components/common/header/HeaderNavLink";
import {MobileHeaderNavLink} from "components/common/header/MobileHeaderNavLink";
import logo from "assets/images/logo.png";
import ToggleBtn from "assets/images/toggle-btn-top.svg";
import { FaBell } from "react-icons/fa";
import {IoMdSettings} from "react-icons/io";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import { FiSearch } from "react-icons/fi";
export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <header className="lg:shadow-none shadow-xls pl-8 pr-8 grid grid-cols-2">
            <div className="flex items-center gap-8">
                <img src={logo} alt="inxpress-logo" className="w-56"/>
                <form className="hidden customXl:!flex rounded-md bg-field-gray border border-solid border-border-gray py-4 px-10">
                    <button className="border-none mr-1 cursor-pointer">
                        <FiSearch size={'2.3rem'} />
                    </button>
                    <input
                        type="text"
                        className="border-0 bg-transparent focus:outline-0"
                        placeholder="Tracking number"
                    />
                </form>
                <div className="">
                    <div className="flex items-center h-full w-5/6">
                        <img src={ToggleBtn} alt="inxpress-logo" className="pt-10 pb-3"/>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 items-center flex-wrap-reverse justify-self-end">

                <nav className="w-full">
                    <ul className="flex justify-around list-none gap-6 items-center" id="navbarNav">
                        <div className="top:0 opacity-1 hidden customLg:!flex justify-around list-none gap-6 items-center">
                            <HeaderNavLink to="overview">Overview</HeaderNavLink>
                            <HeaderNavLink to="freight_history">Freight History</HeaderNavLink>
                            <HeaderNavLink to="get_pricing">Get pricing</HeaderNavLink>
                            <HeaderNavLink to="reports">Reports</HeaderNavLink>
                            <HeaderNavLink to="tools">Tools</HeaderNavLink>
                            <HeaderNavLink to="/saved_quotes">Saved Quotes</HeaderNavLink>
                            <HeaderNavLink to="/faq">FAQs</HeaderNavLink>
                        </div>

                        <div id="bell">
                            <FaBell size='1.8em'/>
                        </div>

                        <div >
                            <IoMdSettings size='2.0em'/>
                        </div>

                        <img alt={''} src={`images/flags/24/us.png`} />

                        <button className="border-0 w-12 h-12 bg-transparent lg:hidden" type="button" onClick={() => setIsNavOpen((prev) => !prev)}>
                            {isNavOpen ? <AiOutlineCloseCircle className="w-full" /> : <AiOutlineMenu className="w-full"/>}
                        </button>
                    </ul>
                </nav>
                <div className={isNavOpen ? "absolute w-full h-screen top-[-30px] left-0 bg-white z-50 flex flex-col justify-evenly items-center" : "hidden"}>
                    <button className="border-0 w-12 h-12 bg-transparent absolute top-[55px] right-[17px]" type="button" onClick={() => setIsNavOpen((prev) => !prev)}>
                        <AiOutlineCloseCircle className="w-full h-full" />
                    </button>
                    <img src={logo} alt="inxpress-logo" className="w-56 absolute top-[60px]"/>
                    <ul className="flex flex-col items-center justify-between">
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="overview">Overview</MobileHeaderNavLink>
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="freight_history">Freight History</MobileHeaderNavLink>
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="get_pricing">Get pricing</MobileHeaderNavLink>
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="reports">Reports</MobileHeaderNavLink>
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="tools">Tools</MobileHeaderNavLink>
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="/saved_quotes">Saved Quotes</MobileHeaderNavLink>
                        <MobileHeaderNavLink setIsNavOpen={setIsNavOpen} to="/faq">FAQs</MobileHeaderNavLink>
                    </ul>
                </div>
            </div>

        </header>
    )
}