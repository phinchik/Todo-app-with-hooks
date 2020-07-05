import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getProjectList } from '../../redux/actions/projects'
import Project from './Project'
import AddProjectModal from '../AddProjectModal'

const Projects = ({ projects, getProjects }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div>
            <AddProjectModal show={show} handleClose={handleClose} />

            {projects && projects.map((project) => {
                return <Project key={project.id} {...project} />
            })}

            <button onClick={handleShow}>Add Project</button>
        </div>
    )
}


const mapDispatchToProps = {
    getProjects: getProjectList,
}

const mapStateToProps = (state) => ({
    projects: state.projects.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)