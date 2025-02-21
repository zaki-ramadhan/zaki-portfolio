/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

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
        { icon: "simple-icons:tailwindcss", color: "text-cyan-500" },
        { icon: "logos:daisyui-icon", color: "" },
        { icon: "simple-icons:javascript", color: "text-yellow-300" },
        { icon: "simple-icons:jquery", color: "text-blue-600" },
        { icon: "simple-icons:php", color: "text-purple-600" },
        { icon: "simple-icons:laravel", color: "text-red-500" },
        { icon: "simple-icons:mysql", color: "text-orange-300" },
    ]}
]

const TechIcon = ({projectName}) => {
    // Cari project yang sesuai
    const project = projectsData.find((p) => p.name === projectName);

    // Jika project tidak ditemukan, tampilkan pesan atau kosongkan
    if (!project) return null;

    return (
        <span id="technologies" className="group max-w-fit p-3 pb-1.5 flex items-center rounded-lg bg-white/5 border border-secondary/20 backdrop-blur-xs absolute bottom-8 left-8 transition-all duration-300 overflow-hidden" >

        {/* Ikon HTML5 (selalu terlihat) */}
        <span className="logo__wrp not-odd:inline-block text-orange-500">
            <Icon icon="simple-icons:html5" width="32" height="32" />
        </span>

         {/* Ikon lainnya (muncul saat hover) */}
            {project.techs.map((item, index) => (
                <span key={index} className="logo__wrp opacity-0 whitespace-nowrap overflow-hidden max-w-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-w-[32px] group-hover:ms-3" >
                    <Icon icon={item.icon} width="32" height="32" className={`inline-block ${item.color}`} />
                </span>
            ))}
    </span>

  )
}

export default TechIcon
