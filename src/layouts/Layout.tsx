import React from 'react';
import Header from "components/common/header/Header";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, Flip} from "react-toastify";

export default function Layout () {
    return (
        <>
            <Header />
            <ToastContainer theme={'light'} transition={Flip} />
        </>
    );
}