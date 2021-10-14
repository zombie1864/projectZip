import '../../css/carousal.css'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {imgSlides} from '../../utils/slides'
import { CgChevronDoubleLeftR, CgChevronDoubleRightR} from 'react-icons/cg'

const Carousel = () => {
    /**
    @description: This comp contains the carousal that will be rendered showing images/code snippets of python projects. To accomplish this npm i 3d-react-carousal was used. 
    **/
    const [currImgIdx, setCurrImg] = useState(0)
    const carousalLength = imgSlides.length 
    const carouselArray = []
    const nxtSlide = () => {
        setCurrImg(currImgIdx === carousalLength - 1 ? 0 : currImgIdx + 1)
    }
    const prevSlide = () => {
        setCurrImg(currImgIdx === 0 ? carousalLength - 1 : currImgIdx - 1)
    }

    
   if (!Array.isArray(imgSlides) || imgSlides.length === -1 ) {
       return null 
   } // this piece of logic is for when there is no data slides or when imgSlides isn't an arr 
   // this is only here for future scalability or additional features 

   for (let num = 0; num < carousalLength; num++) {
    carouselArray.push(num)
   }

   return (
        <div className="carousalContainer">
            <CgChevronDoubleLeftR className="leftArrow" onClick={prevSlide}/>
            {imgSlides.map((imgObj, idx) => {
                return (
                    <motion.div 
                    variants={container}
                    initial='hidden'
                    animate='visible'
                    className={idx === currImgIdx ? 'activeSlide' : null} key={idx}>
                        {
                            idx === currImgIdx && (
                                <div className="activeSlideContent">
                                <img 
                                src={imgObj.imgSrc} 
                                alt={imgObj.alt} 
                                className="carousalImg"/>
                                <div className='carouselLinks'>
                                    <Link 
                                    to={{pathname: '/task'}} 
                                    className='carouselLinkTag'>
                                        <span className='carouselLinkText'>Project Task</span>
                                    </Link>
                                    <Link 
                                    to={{pathname: '/projects'}} 
                                    className='carouselLinkTag'>
                                        <span className='carouselLinkText'>View Projects</span>
                                    </Link>
                                    <a 
                                    className='carouselLinkTag carouselLinkText'
                                    href={imgObj.srcCode} 
                                    target="_blank" 
                                    rel="noreferrer">Source Code</a>
                                </div>
                                <p className='carouselProjTitle'>
                                    Project Title: {imgObj.projTitle}
                                </p>
                                <p className='carouselDesc'>{imgObj.desc}</p>
                                </div>
                            )
                        }{/* trueStatement && result, this is a technique that for ternary without an else clause */}
                    </motion.div>
                )
            })}
            <CgChevronDoubleRightR className="rightArrow" onClick={nxtSlide}/>
            <div className="carouselNavContainer">
                {carouselArray.map(
                    (_, idx) => 
                    <div 
                    className={idx === currImgIdx ? 'activeCarouselNav' : 'carouselNav'} 
                    key={idx}/>
                )}
            </div>
        </div>
    )
}


const container = {
    hidden: { opacity: 0.3, scale: 0.2 },
    visible: {
      opacity: 1,
      scale: 1.05,
      transition: {
          duration: 0.3
      }
    }
};

export default Carousel