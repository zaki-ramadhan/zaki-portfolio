import Card from "./Card";
import ProjectCard from "./ProjectCard";
import Badge from "./Badge";
import ListSocialMedia from './ListSocialMedia';
import avatarAi from "../assets/images/me_ai_vers.webp";
// import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const Cards = () => {
    const { t } = useTranslation();

    // diberi useMemo untuk mencegah re render yang tidak perlu jika bahasa yg aktif berubah
    const title = useMemo(() => t("helloCard.title"), [t]);
    const subtitle = useMemo(() => t("helloCard.subtitle"), [t]);

    // karena dia statis, jadi gunakan useMemo () biar ga ke re render
    // const skillIcons = useMemo(() => (
    //     <span className="flex items-center gap-1 lg:gap-0.5 text-xl font-semibold text-secondary *:lg:p-2 *:transition-all *:duration-150 *:aspect-square *:rounded-full *:lg:bg-secondary/10 *:lg:scale-85">
    //         <Icon icon="famicons:logo-html5" width={40} height={40} className="hover:text-orange-500 active:text-orange-500" />
    //         <Icon icon="ion:logo-css3" width={40} height={40} className="hover:text-blue-500 active:text-blue-500" />
    //         <Icon icon="mdi:language-javascript" width={42} height={42} className="hover:text-yellow-400 active:text-yellow-400" />
    //         <span className="ms-1">+7</span>
    //     </span>
    // ), []); //menggunakan tanda [] karena dia statis, gada state, props, jadi ga bakal berubah

    const socmeds = useMemo(()=> <ListSocialMedia size={30}/>, []); 

    return (
        <main id="cards" className="container py-4 px-4 md:px-10 lg:px-14 flex flex-col -space-y-3">
            <div className="card__wrp container flex flex-col lg:flex-row gap-4">

            {/* hello card */}
                <Card typeCard={'hello-card'} setBgColor = 'container bg-linear-340/srgb from-additional from-[-110%] to-primary to-55%' className={'justify-between lg:rounded-ee-lg lg:basis-2/4 xl:basis-3/4'}> 
                    <header className="flex items-center justify-between">
                        <Badge />
                        {socmeds}
                    </header>
                    <h1 className="text-5xl sm:w-50 md:w-150 -mt-2 md:mt-0 font-Archivo font-light leading-14">{title}</h1>
                    <p className="text-secondary text-base md:text-lg w-10/12 lg:w-9/12 font-light">{subtitle}</p>

                    {/* {skillIcons} */}
                </Card>

                <Card is_image className={'card hidden lg:inline-block group lg:basis-2/4 xl:basis-2/4 max-w-80 rounded-es-lg border border-secondary/15 overflow-hidden'}>
                    <img src={avatarAi} alt="avatar ai" className="h-full"/>
                </Card>
            </div>

            <section id="projects" className="card__wrp container grid lg:grid-cols-2 py-4 mt-4 gap-4">
                <ProjectCard/>
            </section>
        </main>
    )
}

export default Cards