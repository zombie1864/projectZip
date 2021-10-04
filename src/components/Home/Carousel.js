import {imgSlides} from '../../utils/slides'
import '../../css/carousal.css'
import React, { useState } from 'react'
import { CgChevronDoubleLeftR, CgChevronDoubleRightR} from 'react-icons/cg'

const Carousel = () => {
    /**
    @description: This comp contains the carousal that will be rendered showing images/code snippets of python projects. To accomplish this npm i 3d-react-carousal was used. 
    **/
    const [currImg, setCurrImg] = useState(0)
    const carousalLength = imgSlides.length 
    const nxtSlide = () => {
        setCurrImg(currImg === carousalLength - 1 ? 0 : currImg + 1)
    }
    const prevSlide = () => {
        setCurrImg(currImg === 0 ? carousalLength - 1 : currImg - 1)
    }

    
   if (!Array.isArray(imgSlides) || imgSlides.length === -1 ) {
       return null 
   } // this piece of logic is for when there is no data slides or when imgSlides isn't an arr 
   // this is only here for future scalability or additional features 

   return (
        <div className="carousalContainer">
            {/* <ThirdPartyCarousal slides={imgSlides}/> */}
            <CgChevronDoubleLeftR className="leftArrow" onClick={prevSlide}/>
            {imgSlides.map((imgObj, idx) => {
                return (
                    <div className={idx === currImg ? 'activeSlide' : 'slide'} key={idx}>
                        {
                            idx === currImg && (
                                <img 
                                src={imgObj.imgSrc} 
                                alt={imgObj.alt} 
                                className="carousalImg"/>
                            )
                        }
                    </div>
                )
            })}
            <CgChevronDoubleRightR className="rightArrow" onClick={nxtSlide}/>
        </div>
    )
}

export default Carousel