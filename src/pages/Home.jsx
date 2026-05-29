import TopHeader from "../components/TopHeader.jsx";
import MainHeader from "../components/MainHeader.jsx";
import DropdownLanguages from "../components/DropdownLanguages";
import Cards from "../components/Cards.jsx";

const Home = () => {
    return (
        <>
            <TopHeader />
            <MainHeader>
                <DropdownLanguages/>
            </MainHeader>
            <Cards />
        </>
    );
};

export default Home;
