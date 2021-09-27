import {Carousel as ThirdPartyCarousal} from '3d-react-carousal';
import {imgSlides} from '../../utils/slides'

const Carousel = () => {
    /**
    @description: This comp contains the carousal that will be rendered showing images/code snippets of python projects. To accomplish this npm i 3d-react-carousal was used. 
    **/
   return (
        <div>
            <ThirdPartyCarousal slides={imgSlides}/>
        </div>
    )
}

export default Carousel