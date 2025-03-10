/* eslint-disable react/prop-types */
const Card = ({ typeCard, setBgColor,  is_image, children, className }) => {
    is_image ? null : 'p-10';
    return (
        <div className={`card ${typeCard} ${setBgColor} ${!is_image ? 'p-7 sm:p-10 sm:pb-18' : ''} ${className} rounded-[2.7rem] flex flex-col space-y-6 border border-additional/10`}>
            {children} {/*isinya custom sendiri*/}
        </div>
    )
}

export default Card
