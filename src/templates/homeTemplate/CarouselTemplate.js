import '../../css/carousal.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CgChevronDoubleLeftR, CgChevronDoubleRightR} from 'react-icons/cg'
import DefaultAsset from '../../components/Home/DefaultAsset';
import staticImg from '../../assets/img/source-g542577ffb_1920.jpeg'


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


const CarouselTemplate = (
    projectState, 
    proj_img,
    currImgIdx, 
    carouselArray, 
    nxtSlide, 
    prevSlide
) => {
    return (
        <div className="carousalContainer">
            <CgChevronDoubleLeftR className="leftArrow" onClick={prevSlide}/>
            {projectState.length === 0 ? <DefaultAsset/> :
            projectState.map((project, idx) => {
                return (
                    <motion.div 
                    variants={container}
                    initial='hidden'
                    animate='visible'
                    className={idx === currImgIdx ? 'activeSlide' : null} key={idx}>
                        {
                            idx === currImgIdx && (
                                <div className="activeSlideContent">
                                    {
                                        proj_img && 
                                        <img 
                                        src={
                                            proj_img.length > 1 && proj_img[idx] !== 'None' ? proj_img[idx] : staticImg 
                                        } 
                                        alt={'img'} 
                                        className="carousalImg"/>
                                    }
                                <div className='carouselLinks'>
                                    <Link 
                                    to={{pathname: '/tasks'}} 
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
                                    href={project.proj_src_code} 
                                    target="_blank" 
                                    rel="noreferrer">Source Code</a>
                                </div>
                                <p className='carouselProjTitle'>
                                    Project Title: {project.proj_name}
                                </p>
                                <p className='carouselDesc'>{project.proj_desc}</p>
                                </div>
                            )
                        }
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

export default CarouselTemplate
