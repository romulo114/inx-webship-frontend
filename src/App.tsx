import React, { useEffect } from 'react';
import { BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider} from 'react-query'
import 'App.scss';
import Layout from "layouts/Layout";
import {AppRoutes} from "routes/AppRoutes";
import { ReactQueryDevtools } from "react-query/devtools";
import { userLoggedIn } from 'pages/bol_info/api/bol_api';
import { deleteToken, getToken, setToken } from 'pages/bol_info/utility/Utility';
import { TOKEN } from 'pages/bol_info/constants/BOLConstants';

// create react query client
const queryClient = new QueryClient()

const App = () => {
    const tokenState = 'ACB';
    useEffect(() => {
        if (!tokenState) {
            const newTokenFromIMCS = new URLSearchParams(window.location.search).get('token');            
            if (newTokenFromIMCS) {
                setToken(TOKEN, encodeURIComponent(newTokenFromIMCS));
                window.location.replace(`${window.location.origin}${window.location.pathname}`);
            } else {
                userLoggedIn();
            }
        }
        return (() => {
            deleteToken(TOKEN);
        });
    });

    return (
        tokenState ?
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Layout/>
                <AppRoutes />
                <ReactQueryDevtools position={"bottom-right"} initialIsOpen={false} />
            </QueryClientProvider>
        </BrowserRouter>
         : <></>
    );
}
export default App;