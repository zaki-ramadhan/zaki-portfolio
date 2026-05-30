import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopHeader from "../components/TopHeader.jsx";
import MainHeader from "../components/MainHeader.jsx";
import DropdownLanguages from "../components/DropdownLanguages";
import Cards from "../components/Cards.jsx";

const Home = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [hash]);

    return (
        <div id="home">
            <TopHeader />
            <MainHeader>
                <DropdownLanguages/>
            </MainHeader>
            <Cards />
        </div>
    );
};

export default Home;
