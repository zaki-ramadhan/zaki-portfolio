/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Badge from "./Badge";
import avatarAi from "../assets/images/me_ai_vers.jpg";
import ListSocialMedia from './ListSocialMedia';

const Cards = (props) => {
    const { is_reverse, setBgColor } = props;

    return (
        <section id="cards" className="container p-4 h-[26rem] flex gap-4 -mb-2">
            {is_reverse ? (
                <>
                    <div className={`card ${setBgColor} basis-3/4 rounded-[2.7rem] rounded-ee-lg p-10 flex flex-col justify-between border border-additional/10`}>
                        <header className= "flex justify-between">
                            <Badge/>
                            <ListSocialMedia size={24}/>
                        </header>
                        <h1 className="text-5xl w-[32rem] font-Archivo leading-14">Passionate to pursue the technology.</h1>
                        <p className="text-secondary w-4/6">I enjoy learning new things and try to overcome new challenges while analyzing how I improve trough them.</p>
                    </div>
                    <img src={avatarAi} className="card max-w-80 basis-1/4 h-full col-span-1 place-self-end rounded-[2.7rem] rounded-es-lg border border-secondary/15"/>
                </>
            ) : (
                <>
                    <div className={`card bg-gradient-to-tl from-accent-lighter from-[-30%] to-accent basis-2/4 rounded-[2.7rem] rounded-ee-lg p-10 border border-secondary/15`}>
                        <h1 className="font-Archivo text-5xl w-80">Currently I&apos;m working at Wope</h1>
                        <p className="text-white/70 w-56 mt-5">Building polished software and web experiences.</p>
                    </div>
                    <div className="card bg-secondary/5 basis-3/4 rounded-[2.7rem] rounded-es-lg p-4 border border-secondary/15"></div>
                </>
            )}
        </section>
    );
};

export default Cards;
