import React from 'react'
import ProjBtns from '../components/Projs/ProjBtns'
import '../css/projectPage.css'

const ProjectsPage = () => {
    /**
    @description: This container func contains all the comp associated with what is being rendered on the page.
    Project btns. 
    **/
    return (
        <div className="projectPage">
            <h3 className="pageTitleProject">Projects</h3>
            <div>
                <ProjBtns/>
            </div>
        </div>
    )
}

export default ProjectsPage

