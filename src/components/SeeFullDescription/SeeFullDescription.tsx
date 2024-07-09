"use client"

import React from 'react';


const SeeFullDescription = ({seeFullDescriptionText}: {seeFullDescriptionText: string}) => {

    const scrollToDescription = () => {
      const element = document.getElementById('full-description');
      if (element) {
        const offset = -200; // Adjust this value to set the desired offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

    };

    return (
        <span className='underline cursor-pointer' onClick={scrollToDescription}>{seeFullDescriptionText}</span>
    );
};

export default SeeFullDescription;