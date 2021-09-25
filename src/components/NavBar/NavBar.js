import React from 'react'
import {Link} from 'react-router-dom'
import NavBarOptions from './NavBarOptions'
import '../../css/navBar.css'

const NavBar = () => {
    /**
    @description: navBar comp which uses react-router-dom and react-icons
    **/
    return (
        <div>
        <div className="navBar">
            <ul className="nav-ul">
            {NavBarOptions.map((item, idx) => {
                return (
                    <li key={idx} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon} <span className="nav-titles">{item.title}</span>
                        </Link>
                    </li>
                )
            })}
            </ul>
        </div>
        </div>
    )
}

export default NavBar
