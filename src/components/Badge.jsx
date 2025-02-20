/* eslint-disable no-unused-vars */
import React from 'react'
import headAvatar from '../assets/images/me_ai_vers_2(big_head).png'

const Badge = () => {
  return (
    <span className='badge w-fit p-2 rounded-lg flex gap-4'>
      <div className="avatar w-10 h-10 rounded-full bg-additional">
          <img src={headAvatar} alt='headAvatar' className='scale-120'/>
      </div>
        <div className='bio__wrp'>
            <h2>Hi, I&apos;m Zaki.</h2>
            <p className='text-secondary text-xs'>Front-end developer</p>
        </div>
    </span>
  )
}

export default Badge
