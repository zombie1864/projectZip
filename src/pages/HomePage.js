import React from 'react'
import Carousel from '../components/Home/Carousel'
import '../css/homePage.css'

const HomePage = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    **/
   return (
       <div className="homePageContainer">
            <h1 className="homeTitle">ProjectZip</h1>
            <div className="homeMsg">
                ProjectZip is an overview profile for projects. [COMPLETE ME]
            </div>
            <center>
                <Carousel/>
            </center>
        </div>
    )
}

export default HomePage
