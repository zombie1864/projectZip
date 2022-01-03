import { useState, useEffect } from 'react'
import CarouselTemplate from '../../templates/homeTemplate/CarouselTemplate'

const Carousel = () => {
    /**
    @description: This comp contains the carousal that will be rendered showing images/code snippets of python projects.
    **/
    const [currImgIdx, setCurrImg] = useState(0), 
    [projectState, setProjectState] = useState(),
    [proj_img, setProj_img] = useState()

    const carouselArray = []


    const nxtSlide = () => {
        setCurrImg(currImgIdx === projectState.length  - 1 ? 0 : currImgIdx + 1)
    }


    const prevSlide = () => {
        setCurrImg(currImgIdx === 0 ? projectState.length  - 1 : currImgIdx - 1)
    }

    useEffect( () => {
        const receiveData = async () => {
            const home_proj_resources = await fetch('http://localhost:5000/', {method: 'GET'})
            const resp = await home_proj_resources.json()
            let imgResource = []
            resp.forEach(async proj_resource => {
                const imgs = await fetch(
                    `http://localhost:5000/proj_img/${proj_resource.proj_id}`, {method: 'GET'}
                )
                if (imgs.status === 204) { 
                    imgResource.push('None')
                } else {
                    const img_resp = await imgs.blob()
                    imgResource.push(URL.createObjectURL(img_resp))
                }
            });
            setProjectState(resp); 
            setProj_img(imgResource)
        }
        receiveData()
    }, [])

    
   if (!Array.isArray(projectState) || projectState.length === -1 ) {
       return null 
   } // this piece of logic is for when there is no data slides or when imgSlides isn't an arr 
   // this is only here for future scalability or additional features 

   for (let num = 0; num < projectState.length ; num++) {
    carouselArray.push(num)
   }

   return CarouselTemplate(
       projectState,
       proj_img,
       currImgIdx, 
       carouselArray,
       nxtSlide, 
       prevSlide
   )
}


export default Carousel