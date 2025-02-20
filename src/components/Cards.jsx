/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Badge from "./Badge";
import avatarAi from "../assets/images/me_ai_vers.jpg";
import webPreview from "../assets/images/ss_pricing_page.png";
import ListSocialMedia from './ListSocialMedia';
import { Icon } from "@iconify-icon/react";

const Cards = (props) => {
    const { is_reverse, setBgColor } = props;

    return (
        <section id="cards" className="container p-4 flex gap-4 -mb-2">
            {is_reverse ? (
                <>
                    <div className={`card h-[26rem] ${setBgColor} basis-3/4 rounded-[2.7rem] rounded-ee-lg p-10 flex flex-col justify-between border border-additional/10`}>
                        <header className= "flex justify-between">
                            <Badge/>
                            <ListSocialMedia size={24}/>
                        </header>
                        <h1 className="text-5xl w-[32rem] font-Archivo leading-14">Passionate to pursue the technology.</h1>
                        <p className="text-secondary w-4/6">I enjoy learning new things and try to overcome new challenges while analyzing how I improve trough them.</p>
                    </div>
                    <img src={avatarAi} className="card h-[26rem] max-w-80 basis-1/4 col-span-1 place-self-end rounded-[2.7rem] rounded-es-lg border border-secondary/15"/>
                </>
            ) : (
                <>
                    <div className={`card h-[30rem] bg-gradient-to-tl from-emerald-800 from-[-110%] to-zappify/70 to-70% basis-2/4 rounded-[2.7rem] rounded-ee-lg p-10 border border-secondary/15`}>
                        <h1 className="font-Archivo text-5xl w-80 leading-14 text-white/40">Currently I&apos;m working at -<span className="text-white">Zappify</span>.</h1>
                        <p className="text-white/70 w-56 mt-5">Building polished software and web experiences.</p>
                    </div>
                    <div className={`card relative h-[30rem] ${setBgColor} basis-3/4 rounded-[2.7rem] rounded-es-lg p-10 border border-secondary/15 overflow-hidden`}>
                        <span>
                            <h1 className="text-3xl font-Archivo flex items-center gap-2">zappify<span className="text-secondary -ms-2">.com</span><Icon icon="stash:arrow-up-light" width="24" height="24" className="text-white/80 rotate-45 p-2 bg-secondary/20 hover:bg-secondary/30 rounded-full cursor-pointer"/></h1>
                            <p className="text-secondary mt-3">Smart rank-traker for everyone.</p>
                        </span>
                        <div className="web-preview__wrp w-fit h-fit absolute -bottom-90 left-0 scale-85">
                            <img src={webPreview} className="rounded-3xl"/>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Cards;
