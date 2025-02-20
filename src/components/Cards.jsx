/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import ListSocialMedia from './ListSocialMedia';
import avatarAi from "../assets/images/me_ai_vers.jpg";
import webPreview from "../assets/images/ss_pricing_page.png";
import { Icon } from "@iconify-icon/react";

const Cards = () => {
    return (
        <section id="cards" className="container p-4 flex flex-col -space-y-3">
            <div className="card__wrp container p-4 flex gap-4 h-[26rem]">

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

            <div className="card__wrp container p-4 flex gap-4 h-[30rem]">
                <Card typeCard={'project-card'} setBgColor ='bg-gradient-to-tl from-emerald-800 from-[-110%] to-zappify/40 to-70%' className={'basis-2/4 rounded-ee-lg'}>
                    <h1 className="font-Archivo text-5xl font-light w-80 leading-14 text-secondary">Currently I&apos;m working at <span className="text-white font-normal">Zappify</span>.</h1>
                    <p className="text-secondary text-lg font-light w-60 mt-6">Building polished software and web experiences.</p>
                </Card>

                {/* project card */}
                <Card typeCard={'preview-project-card'} setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'} className={'card relative basis-3/4 rounded-es-lg p-10 border border-emerald-900/20 overflow-hidden'}>
                    <span>
                        <h1 className="text-3xl font-Archivo flex items-center gap-2">zappify<span className="text-secondary -ms-2">.com</span><a href="https://github.com/zaki-ramadhan/zappify" target="_blank"><Icon icon="stash:arrow-up-light" width="24" height="24" className="text-white/80 rotate-45 p-2 bg-secondary/20 hover:bg-secondary/30 rounded-full ms-1 translate-y-1 cursor-pointer"/></a></h1>
                        <p className="text-secondary mt-3">Smart rank-tracker for everyone.</p>
                    </span>

                    <div className="web-preview__wrp w-fit h-fit absolute -bottom-100 left-0 scale-85">
                        <img src={webPreview} className="rounded-3xl"/>
                    </div>
                    <span className="status absolute top-13 right-13 py-2 px-3 rounded-full bg-secondary/20 text-xs">In Progress</span>
                </Card>
            </div>

            <div className="card__wrp container p-4 flex gap-4 h-[30rem]">
                <Card typeCard={'project-card'} setBgColor={'bg-gradient-to-tl from-emerald-800 from-[-110%] to-zappify/40 to-70%'} className={'basis-2/4 rounded-ee-lg'}>
                    <h1 className="font-Archivo text-5xl font-light w-80 leading-14 text-secondary">Currently I&apos;m working at <span className="text-white font-normal">Zappify</span>.</h1>
                    <p className="text-secondary text-lg font-light w-60 mt-6">Building polished software and web experiences.</p>
                </Card>

                {/* project card */}
                <Card typeCard={'preview-project'} setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'} className={'card relative basis-2/4 rounded-es-lg p-10 border border-emerald-900/20 overflow-hidden'}>
                    <span>
                        <h1 className="text-3xl font-Archivo flex items-center gap-2">zappify<span className="text-secondary -ms-2">.com</span><a href="https://github.com/zaki-ramadhan/zappify" target="_blank"><Icon icon="stash:arrow-up-light" width="24" height="24" className="text-white/80 rotate-45 p-2 bg-secondary/20 hover:bg-secondary/30 rounded-full ms-1 translate-y-1 cursor-pointer"/></a></h1>
                        <p className="text-secondary mt-3">Smart rank-tracker for everyone.</p>
                    </span>

                    <div className="web-preview__wrp w-fit h-fit absolute -bottom-100 left-0 scale-85">
                        <img src={webPreview} className="rounded-3xl"/>
                    </div>
                    <span className="status absolute top-13 right-13 py-2 px-3 rounded-full bg-secondary/20 text-xs">In Progress</span>
                </Card>
            </div>
            <div className="card__wrp flex p-10 gap-4">
                <Card is_projectCard/>
                <Card is_projectCard/>
            </div>
        </section>
    )
}

export default Cards
