import{AiOutlineBars, AiOutlineHome, AiOutlineEdit,AiOutlineLinkedin} from 'react-icons/ai'
import {VscGithub} from 'react-icons/vsc'
import {SiAngellist} from 'react-icons/si'

const NavBarOptions = [
    {
        title: 'Home',
        path: '/',
        icon: <AiOutlineHome/>,
        navType: 'internal'
    },
    {
        title: 'Projects',
        path: '/projects',
        icon: <AiOutlineBars/>,
        navType: 'internal'
    },
    {
        title: 'Task',
        path: '/task',
        icon: <AiOutlineEdit/>,
        navType: 'internal'
    },
    {
        title: 'gitHub',
        path: 'https://github.com/zombie1864',
        icon: <VscGithub/>,
        navType: 'external'
    },
    {
        title: 'linkedIn',
        path: 'https://www.linkedin.com/in/jeff-varela-a3194692/',
        icon: <AiOutlineLinkedin/>,
        navType: 'external'
    },
    {
        title: 'AngleList',
        path: 'https://angel.co/u/jeff-varela',
        icon: <SiAngellist/>,
        navType: 'external'
    },
]

export default NavBarOptions
