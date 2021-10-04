import {Carousel as ThirdPartyCarousal} from '3d-react-carousal'
import {imgSlides} from '../../utils/slides'
import '../../css/carousal.css'

const Carousel = () => {
    /**
    @description: This comp contains the carousal that will be rendered showing images/code snippets of python projects. To accomplish this npm i 3d-react-carousal was used. 
    **/
   return (
        <div className="carousalContainer">
            {console.log('render')}
            <ThirdPartyCarousal slides={imgSlides}/>
        </div>
    )
}
export default Carousel