import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ChainInfo from "./pages/ChainInfo";
import Error from "./pages/Error404";
import FakeBayc from "./pages/FakeBayc";
import FakeBaycTokenInfos from "./pages/FakeBaycTokenInfos";
import FakeNefturians from "./pages/FakeNefturians"
import FakeNefturiansTokenInfos from "./pages/FakeNefturiansTokenInfos";
import FakeMeebits from "./pages/FakeMeebits"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/error404" element={<Error />} />
            <Route path="/chain-info" element={<ChainInfo />} />
            <Route path="/fakeBayc" element={<FakeBayc />} />
            <Route path="/fakeBayc/:id" element={<FakeBaycTokenInfos />} />
            <Route path="/fakeNefturians" element={<FakeNefturians />} />
            <Route path="/fakeNefturians/:account" element={<FakeNefturiansTokenInfos />} />
            <Route path="/fakeMeebits" element={<FakeMeebits />} />
        </Routes>
    );
}

export default AppRoutes;