/* eslint-disable no-unused-vars */
import React from 'react'
import headAvatar from '../assets/images/me_ai_vers_2(big_head).png'

const Badge = () => {
  return (
    <span className='badge w-fit p-2 rounded-lg flex items-center gap-4'>
      <div className="avatar w-12 h-12 lg:w-10 lg:h-10 rounded-full bg-additional scale-90 md:scale-100">
          <img src={headAvatar} alt='headAvatar' className='scale-120'/>
      </div>
        <div className='bio__wrp'>
            <h2 className='text-base lg:text-lg'>Hi, I&apos;m Zaki.</h2>
            <p className='text-secondary text-base lg:text-base line-clamp-1'>Front-end developer</p>
        </div>
    </span>
  )
}

export default Badge
