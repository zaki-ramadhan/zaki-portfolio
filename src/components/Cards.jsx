/* eslint-disable no-unused-vars */
import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import ListSocialMedia from './ListSocialMedia';
import avatarAi from "../assets/images/me_ai_vers.jpg";

import zappifyPreview from "../assets/images/ss_pricing_page.png";
import katIbuPreview from "../assets/images/ss_dashboard_admin_katering_ibu.png";

const Cards = () => {
    return (
        <main id="cards" className="container py-4 px-20 flex flex-col -space-y-3">
            <div className="card__wrp container flex gap-4">

            {/* hello card */}
                <Card typeCard={'hello-card'} setBgColor = 'bg-gradient-to-tl from-additional from-[-130%] to-primary to-55%' className={'justify-between rounded-ee-lg basis-3/4'}> 
                    <header className="flex justify-between">
                        <Badge />
                        <ListSocialMedia size={26} />
                    </header>
                    <h1 className="text-5xl w-[32rem] font-Archivo font-light leading-14">Passionate to pursue the technology.</h1>
                    <p className="text-secondary text-lg w-7/12">I enjoy learning new things and try to overcome new challenges while analyzing how I improve through them.</p>
                </Card>

                <Card is_image className={'card basis-1/4 min-w-90 rounded-es-lg border border-secondary/15 overflow-hidden'}>
                    <img src={avatarAi} className="h-full "/>
                </Card>
            </div>

            <section id="projects" className="card__wrp container grid grid-cols-2 py-4 mt-4 gap-4 h-[30rem]">
                <Card is_projectCard linkProject={'https://github.com/zaki-ramadhan/zappify?tab=readme-ov-file#'} projectStatus={'In Progress'} projectTitle={'Zappify'} titleColor={'text-white/80'} projectDesc={'Simplify Investing, Maximize Returns.'} setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'} projectPreview={zappifyPreview} btnColor={'bg-secondary/20'} xPosition={'-bottom-65'} bg={'bg-white/5'}/>
                
                <Card is_projectCard linkProject={'https://github.com/zaki-ramadhan/katering-ibu?tab=readme-ov-file#katering-ibu-a-laravel-based-catering-website'} projectStatus={'Under Maintenance'} projectTitle={'Katering Ibu'} titleColor={'text-slate-700'} projectDesc={'Homemade Goodness, Anytime You Need It'} setBgColor={'bg-radial-[at_100%_-40%] from-white to-slate-200 to-60%'} projectPreview={katIbuPreview} btnColor={'bg-secondary/10'} xPosition={'-bottom-35'} bg={'bg-white/20'}/>
            </section>
        </main>
    )
}

export default Cards
