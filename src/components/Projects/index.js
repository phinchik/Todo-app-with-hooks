import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getProjectList } from '../../redux/actions/projects'
import Project from './Project'
import AddProjectModal from '../AddProjectModal'
import MultiSelect from "react-multi-select-component"
import { getItemFromLocalStorage } from '../../redux/actions/helper'
import './index.scss'
import Button from 'react-bootstrap/Button'

const Projects = ({ projects, getProjects }) => {
    const users = getItemFromLocalStorage('users')
    // const usersForSelect = Object.values(getItemFromLocalStorage('users')).map((user) => ({ label: user.username, value: user.userId }))
    const [show, setShow] = useState(false);
    // const [selected, setSelected] = useState([]);
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
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '80px' }}>
                <h1>Projects</h1>
                <Button variant='primary' onClick={handleShow}>Add Project</Button>
            </div>

            <AddProjectModal show={show} handleClose={handleClose} editedProjectData={editedProjectData} />

            {projects.length
                ? projects && projects.map((project) => {
                    return <Project key={project.id} {...project} editProject={editProject} />
                })
                : <p>You currently have no projects to view!</p>
            }
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