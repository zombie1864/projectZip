import React from 'react'
import PropTypes from 'prop-types'

const MyComp = ({title}) => {
    /**
    @description: 
    @param {string} props: The title value assign to h1 tag
    **/

   const logEvent = () => console.log('click');

    return (
        <div>
            <h1 style={headingStyle}>{title}</h1>
            <button onClick={logEvent}>Click on Me!</button>
            {listOfObj.map( obj => {
                return <h3 key={obj.id}>{obj.txt}</h3>
            })}
        </div>
    )
}

MyComp.defaultProps = {
    title: 'Default'
}

MyComp.propTypes = {
    title: PropTypes.string
}

const headingStyle = {
    color:'red', 
    backgroundColor:'black'
}

const listOfObj = [
    {
        id: 1, 
        txt: 'React check-in',
        date: 'Feb 6th at 1:30pm',
        reminder: true 
    },
    {
        id: 2, 
        txt: 'Look over docs',
        date: 'Feb 6th at 9:30am',
        reminder: true 
    },
    {
        id: 3, 
        txt: 'Log off',
        date: 'Feb 6th at 4:30pm',
        reminder: false 
    },
]

export default MyComp

