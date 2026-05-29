import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

import ErrorPage from "./pages/ErrorPage";

// We use basename to match your GitHub Pages path /zaki-portfolio
const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <Router basename="/zaki-portfolio">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    {/* Catch-all 404 route - Now works for /asas/asa style paths */}
                    <Route path="*" element={<ErrorPage code="404" />} />
                </Routes>
            </Router>
        </I18nextProvider>
    );
};

export default App;
