import React from 'react'
import Carousel from '../components/Home/Carousel'
import '../css/homePage.css'

const Home = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    **/
    return (
        <div className="homePageContainer">
            <h1 className="homeTitle">iPython</h1>
            <span className="homeMsg">
                Welcome to iPython an overview profile for command line interface projects
            </span>
            <Carousel/>
        </div>
    )
}

export default Home
