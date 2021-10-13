import React from 'react'
import Carousel from '../components/Home/Carousel'
import '../css/homePage.css'

const HomePage = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    **/
   return (
       <div className="homePageContainer">
            <h1 className="homeTitle">iPython</h1>
            <div className="homeMsg">
                iPython is an overview profile for command line interface projects. Here you can learn about projects that deal with data aquisition and data management. These projects lack visualization components but are often used as API for data pipelines and data science applications. 
            </div>
            <Carousel/>
        </div>
    )
}

export default HomePage
