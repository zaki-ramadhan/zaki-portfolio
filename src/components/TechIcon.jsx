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
    // Cari project yang sesuai
    const project = projectsData.find((p) => p.name === projectName);

    // Jika project tidak ditemukan, tampilkan pesan atau kosongkan
    if (!project) return null;

    return (
        <span id="technologies" className={`group max-w-fit p-3 pb-1.5 flex items-center rounded-xl ${bg} border border-secondary/10 hover:border-secondary/20 backdrop-blur-xs hover:shadow-lg hover:shadow-black/2 absolute bottom-6 right-7 transition-all duration-300 overflow-hidden z-20`} >

        {/* Ikon HTML5 (selalu terlihat) */}
        <span className="logo__wrp not-odd:inline-block text-orange-500">
            <Icon icon="simple-icons:html5" width="28" height="28" />
        </span>

         {/* Ikon lainnya (muncul saat hover) */}
            {project.techs.map((item, index) => (
                <span key={index} className="logo__wrp opacity-0 whitespace-nowrap overflow-hidden max-w-0 transition-all duration-300 group-hover:opacity-100 group-hover:max-w-[28px] group-hover:ms-4" >
                    <Icon icon={item.icon} width="28" height="28" className={`inline-block ${item.color}`} />
                </span>
            ))}
    </span>

  )
}

export default TechIcon
