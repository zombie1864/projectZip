import React from 'react'
import {Link} from 'react-router-dom'
import NavBarOptions from './NavBarOptions'
import '../../css/navBar.css'

const NavBar = () => {
    /**
    @description: navBar comp which uses react-router-dom and react-icons
    **/
    return (
        <div className="navBarContainer">
            <ul className="nav-ul">
            {NavBarOptions.map((item, idx) => {
                return (
                    <li key={idx} className="nav-li">
                        {
                            item.navType === 'internal' ? 
                            <Link to={item.path}>
                                {item.icon} <span className="nav-titles">{item.title}</span>
                            </Link> : 
                            <a 
                            href={item.path} 
                            target="_blank" 
                            rel="noreferrer">
                                {item.icon} <span className="nav-titles-ex">{item.title}</span>
                            </a> 
                        }
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default NavBar
