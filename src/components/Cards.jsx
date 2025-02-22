/* eslint-disable no-unused-vars */
import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import ListSocialMedia from './ListSocialMedia';
import avatarAi from "../assets/images/me_ai_vers.jpg";
import { Icon } from "@iconify-icon/react";


import zappifyPreview from "../assets/images/ss_pricing_page.png";
import katIbuPreview from "../assets/images/ss_dashboard_admin_katering_ibu.png";

const Cards = () => {
    return (
        <main id="cards" className="container py-4 px-4 md:px-20 flex flex-col -space-y-3">
            <div className="card__wrp container flex flex-col lg:flex-row gap-4">

            {/* hello card */}
                <Card typeCard={'hello-card'} setBgColor = 'container bg-linear-340/srgb from-additional from-[-110%] to-primary to-55%' className={'justify-between lg:rounded-ee-lg basis-3/4'}> 
                    <header className="flex justify-between">
                        <Badge />
                        <ListSocialMedia size={26} />
                    </header>
                    <h1 className="text-5xl w-[32rem] font-Archivo font-light leading-14">Passionate to pursue the technology.</h1>
                    <p className="text-secondary text-lg w-8/12 font-light">I enjoy learning new things and try to overcome new challenges while analyzing how I improve through them.</p>

                    <span className="flex items-center gap-1 text-2xl lg:text-lg font-semibold text-secondary">
                        <Icon icon="famicons:logo-html5" className="lg:p-1.5 w-10 h-auto aspect-square lg:bg-secondary/10 hover:text-orange-500 transition-all duration-150 rounded-full" />
                        <Icon icon="ion:logo-css3" className="lg:p-1.5 w-10 h-auto aspect-square lg:bg-secondary/10 hover:text-blue-500 transition-all duration-150 rounded-full" />
                        <Icon icon="mdi:language-javascript" className="lg:p-1.5 w-10 h-auto aspect-square lg:bg-secondary/10 hover:text-yellow-400 transition-all duration-150 rounded-full" />
                        <span className="ms-1">+3</span>

                    </span>
                </Card>

                <Card is_image className={'card hidden lg:inline-block group basis-1/4 min-w-90 rounded-es-lg border border-secondary/15 overflow-hidden'}>
                    <img src={avatarAi} className="h-full group-hover:scale-105 transition-all duration-500"/>
                </Card>
            </div>

            <section id="projects" className="card__wrp container grid lg:grid-cols-2 py-4 mt-4 gap-4">
                <Card is_projectCard linkProject={'https://github.com/zaki-ramadhan/zappify?tab=readme-ov-file#zappify'} projectStatus={'In Progress'} projectTitle={'Zappify'} titleColor={'text-white/80'} projectDesc={'Simplify Investing, Maximize Returns.'} setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'} projectPreview={zappifyPreview} btnColor={'bg-secondary/20'} xPosition={'-bottom-55'} bg={'bg-white/5'} overlayColor={'from-zappify to-zappify/0'} />

                <Card is_projectCard linkProject={'https://github.com/zaki-ramadhan/katering-ibu?tab=readme-ov-file#katering-ibu-a-laravel-based-catering-website'} projectStatus={'Under Maintenance'} projectTitle={'Katering Ibu'} titleColor={'text-slate-700'} projectDesc={'Homemade Goodness, Anytime You Need It'} setBgColor={'bg-radial-[at_100%_-40%] from-white to-slate-200 to-60%'} projectPreview={katIbuPreview} btnColor={'bg-secondary/10'} xPosition={'-bottom-30'} bg={'bg-white/20'} overlayColor={'from-white to-white/0'}/>
            </section>
        </main>
    )
}

export default Cards
