/* eslint-disable react/prop-types */
const Card = ({ id, typeCard, setBgColor, is_image, children, className }) => {
    return (
        <div id={id} className={`card ${typeCard} ${setBgColor} ${!is_image ? 'p-7 sm:p-10 sm:pb-14' : ''} ${className} rounded-[2.7rem] flex flex-col space-y-6 border border-additional/10`}>
            {children}
        </div>
    )
}

export default Card
