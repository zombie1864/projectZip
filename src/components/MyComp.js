import React from 'react'
import PropTypes from 'prop-types'

const MyComp = ({title}) => {
    /**
    @description: 
    @param {string} props: The title value assign to h1 tag
    **/
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

MyComp.defaultProps = {
    title: 'Default'
}

MyComp.propTypes = {
    title: PropTypes.string
}

export default MyComp

