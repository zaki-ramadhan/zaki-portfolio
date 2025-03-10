/* eslint-disable no-unused-vars */
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import MainHeader from "./components/MainHeader.jsx";
import Cards from "./components/Cards.jsx";
import TopHeader from "./components/TopHeader.jsx";
import DropdownLanguages from "./components/DropdownLanguages";

const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <TopHeader />
            <MainHeader>
                <DropdownLanguages/>
            </MainHeader>
            <Cards />
        </I18nextProvider>
    );
};

export default App;
