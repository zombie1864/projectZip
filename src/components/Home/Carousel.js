import {imgSlides} from '../../utils/slides'
import '../../css/carousal.css'
import React, { useState } from 'react'
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
                    <div className={idx === currImgIdx ? 'activeSlide' : 'slide'} key={idx}>
                        {
                            idx === currImgIdx && (
                                <div>
                                    <img 
                                    src={imgObj.imgSrc} 
                                    alt={imgObj.alt} 
                                    className="carousalImg"/>
                                    <div>
                                        <p>{imgObj.desc}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            })}
            <CgChevronDoubleRightR className="rightArrow" onClick={nxtSlide}/>
            <div className="carouselIdxContainer">
                {carouselArray.map(
                    (_, idx) => 
                    <div 
                    className={idx === currImgIdx ? 'activeCarouselIdx' : 'carouselIdx'} 
                    key={idx}/>
                )}
            </div>
        </div>
    )
}

export default Carousel