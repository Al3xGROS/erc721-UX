import React from "react";
import { Route, Routes } from "react-router-dom";

import ChainInfo from "./pages/ChainInfo";
import Error from "./pages/Error404";


function AppRoutes() {

    return (
        <Routes>
            <Route path="/error404" element={<Error />} />
            <Route path="/chain-info" element={<ChainInfo />} />
        </Routes>
    );
}

export default AppRoutes;