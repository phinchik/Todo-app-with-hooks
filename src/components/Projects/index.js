import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getProjectList } from '../../redux/actions/projects'
import Project from './Project'
import AddProjectModal from '../AddProjectModal'
import './index.scss'
import Button from 'react-bootstrap/Button'

const Projects = ({ projects, getProjects }) => {
    const [show, setShow] = useState(false);
    const [editedProjectData, setEditedProjectData] = useState('')

    const handleClose = () => {
        setShow(false)
        setEditedProjectData('')
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProjects()
    }, [])

    const editProject = (id) => {
        const projectEditData = projects && projects.filter((project) => {
            return project.id === id
        })
        setEditedProjectData(projectEditData[0])
        setShow(true)
    }

    return (
        <>
            <div className='topContainer'>
                <h1 className='projectsTitle'>Projects</h1>
                <Button variant='success' onClick={handleShow}>Add Project</Button>
            </div>

            <AddProjectModal show={show} handleClose={handleClose} editedProjectData={editedProjectData} />

            {projects.length
                ? projects && projects.map((project, i) => {
                    return <Project key={i} {...project} editProject={editProject} />
                })
                : <p>You currently have no projects to view!</p>
            }
        </>
    )
}

const mapDispatchToProps = {
    getProjects: getProjectList,
}

const mapStateToProps = (state) => ({
    projects: state.projects.list
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects)