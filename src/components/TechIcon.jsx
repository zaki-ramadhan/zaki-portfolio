/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

const projectsData = [{
    name: "Zappify",
    techs : [
        { icon: "simple-icons:css3", color: "text-blue-400" },
        { icon: "simple-icons:javascript", color: "text-yellow-300" },
        { icon: "simple-icons:react", color: "text-blue-400" },
        { icon: "simple-icons:tailwindcss", color: "text-cyan-500" },
    ]},
    { name: "Katering Ibu",
    techs : [
        { icon: "simple-icons:css3", color: "text-blue-400" },
        { icon: "simple-icons:javascript", color: "text-yellow-300" },
        { icon: "simple-icons:php", color: "text-purple-600" },
        { icon: "simple-icons:tailwindcss", color: "text-cyan-500" },
        { icon: "logos:daisyui-icon", color: "" },
        { icon: "simple-icons:jquery", color: "text-blue-600" },
        { icon: "simple-icons:laravel", color: "text-red-500" },
        { icon: "simple-icons:mysql", color: "text-orange-300" },
    ]}
]

const TechIcon = ({projectName, bg}) => {
    // state untuk mengatur ketika di klik
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(true); // Aktifkan state
        setTimeout(() => setIsActive(false), 2000); // Kembali ke false setelah 3 detik
    };


    // Cari project yang sesuai
    const project = projectsData.find((item) => item.name === projectName);
    
    // Jika project tidak ditemukan, tampilkan pesan atau kosongkan
    if (!project) return null;

    return (
        <span id="technologies" onClick={handleClick} className={`group overflow-visible max-w-fit p-3 pb-1.5 flex items-center rounded-xl ${bg} border border-secondary/10 hover:border-secondary/20 backdrop-blur-xs hover:shadow-lg hover:shadow-black/2 active:shadow-lg active:shadow-black/2 absolute bottom-6 right-7 transition-all duration-300 overflow-hidden z-20`} >

        {/* Ikon HTML5 (selalu terlihat) */}
        <span className="logo__wrp not-odd:inline-block text-orange-500">
            <Icon icon="simple-icons:html5" width="28" height="28" />
            {project.techs.map((item, index) => (
                <span key={index} className={`count-badge absolute top-[-.5rem] right-[-.5rem] hidden last:grid place-content-center z-20 text-white text-xs scale-90 p-2 rounded-full bg-blue-400 max-w-fit max-h-fit aspect-square animate-bounce font-medium group-hover:opacity-0 ${isActive ? "opacity-0" : ""} transition-all`}>{index + 1}</span>
            ))}
        </span>

         {/* Ikon lainnya (muncul saat hover) */}
            {project.techs.map((item, index) => (
                <span key={index} className={`logo__wrp opacity-0 whitespace-nowrap overflow-hidden max-w-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-w-[28px] group-hover:ms-4 group-active:opacity-100 group-active:max-w-[28px] group-active:ms-4 ${isActive ? "opacity-100 max-w-[28px] ms-4" : ""}`} >
                    <Icon icon={item.icon} width="28" height="28" className={`inline-block ${item.color}`} />
                </span>
            ))}
    </span>

  )
}

export default TechIcon
