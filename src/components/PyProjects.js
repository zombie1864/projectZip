import {Carousel} from '3d-react-carousal';
import {imgSlides} from '../utils/slides'

const PyProjects = () => {
    /**
    @description: This comp contains the carousal that will be rendered showing images/code snippets of python projects. To accomplish this npm i 3d-react-carousal was used. 
    **/
   return (
        <div>
            <Carousel slides={imgSlides}/>
        </div>
    )
}

export default PyProjects