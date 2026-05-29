import Card from "./Card";
import Badge from "./Badge";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ListSocialMedia from "./ListSocialMedia";

const HelloCard = () => {
    const { t } = useTranslation();

    const title = useMemo(() => t("helloCard.title"), [t]);
    const subtitle = useMemo(() => t("helloCard.subtitle"), [t]);
    const socmeds = useMemo(() => <ListSocialMedia size={30} />, []);

    return (
        <Card
            id="profile"
            typeCard="hello-card"
            setBgColor="bg-linear-340/srgb from-additional from-[-110%] to-primary to-55%"
            className="justify-between lg:rounded-ee-lg lg:basis-2/4 xl:basis-3/4"
        >
            <header className="flex items-center justify-between">
                <Badge />
                {socmeds}
            </header>
            <h1 className="text-5xl sm:w-50 md:w-150 -mt-2 md:mt-0 font-Archivo font-light leading-14">
                {title}
            </h1>
            <p className="text-secondary text-base md:text-lg w-10/12 lg:w-9/12 font-light">
                {subtitle}
            </p>
        </Card>
    );
};

export default HelloCard;
