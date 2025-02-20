/* eslint-disable no-unused-vars */
import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import ListSocialMedia from './ListSocialMedia';
import avatarAi from "../assets/images/me_ai_vers.jpg";
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

            <div className="card__wrp container grid grid-cols-2 p-10 gap-4 h-[30rem]">
                <Card is_projectCard setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'}/>
                <Card is_projectCard setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'}/>
                <Card is_projectCard setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'}/>
                <Card is_projectCard setBgColor={'bg-radial-[at_100%_-40%] from-emerald-800 to-zappify/40 to-60%'}/>
            </div>
        </section>
    )
}

export default Cards
