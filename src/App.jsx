import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";

import ErrorPage from "./pages/ErrorPage";

// We use BrowserRouter for better compatibility with standard web hosting
const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/0/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    {/* Catch-all 404 route */}
                    <Route path="*" element={<ErrorPage code="404" />} />
                </Routes>
                <ScrollToTop />
            </Router>
        </I18nextProvider>
    );
};

export default App;
