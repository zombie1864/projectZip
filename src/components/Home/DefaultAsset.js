import staticImg from '../../assets/img/source-g542577ffb_1920.jpeg'
import { Link } from 'react-router-dom'


const DefaultAsset = () => {
    return (
        <div className='activeSlide'>
            <div className="activeSlideContent">
                <img 
                src={staticImg} 
                alt={'img'} 
                className="carousalImg"/>
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
                {/* <a 
                className='carouselLinkTag carouselLinkText'
                href={project.proj_src_code} 
                target="_blank" 
                rel="noreferrer">Source Code</a> */}
            </div>
            <p className='carouselProjTitle'>
                Project Title: Your New Project
            </p>
            <p className='carouselDesc'>Your new project awaits</p>
            </div>
        </div>
    )
}

export default DefaultAsset
