import{AiOutlineBars, AiOutlineHome, AiOutlineEdit} from 'react-icons/ai'

const NavBarOptions = [
    {
        title: 'Home',
        path: '/',
        icon: <AiOutlineHome/>,
        cName: 'nav-li'
    },
    {
        title: 'Projects',
        path: '/projects',
        icon: <AiOutlineBars/>,
        cName: 'nav-li'
    },
    {
        title: 'Task',
        path: '/task',
        icon: <AiOutlineEdit/>,
        cName: 'nav-li'
    },
]

export default NavBarOptions
