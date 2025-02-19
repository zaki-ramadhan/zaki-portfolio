/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Icon } from "@iconify-icon/react";

const ListSocialMedia = (props) => {
    const { size } = props;
    return (
            <span className='flex gap-3 items-start'>
                <a href="https://www.instagram.com/zaki_ramadhannn" target='_blank'>
                    <Icon icon="basil:instagram-outline" width = {size}  height = {size} className='text-white hover:text-secondary p-2 rounded-lg bg-secondary/5 cursor-pointer' />
                </a>
                <a href="https://github.com/zaki-ramadhan" target='_blank'>
                    <Icon icon="mdi:github" width = {size}  height = {size} className='text-white hover:text-secondary p-2 rounded-lg bg-secondary/5 cursor-pointer' />
                </a>
                <a href="https://www.linkedin.com/in/zaki-ramadhan" target='_blank'>
                    <Icon icon="ri:linkedin-fill" width = {size}  height = {size} className='text-white hover:text-secondary p-2 rounded-lg bg-secondary/5 cursor-pointer' />
                </a>
            </span>
    );
}

export default ListSocialMedia
