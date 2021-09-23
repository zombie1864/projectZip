import React from 'react'
import{AiOutlineBars} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import '../css/navBar.css'

const NavBar = () => {
    /**
    @description: navBar comp which uses react-router-dom and react-icons
    **/
    return (
        <div>
            <div className="navBar">
                <Link to='#' className="menu-bars">
                    <AiOutlineBars/> <span className="projects">Projects</span>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
