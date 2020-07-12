import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getProjectList } from '../../redux/actions/projects'
import Project from './Project'
import AddProjectModal from '../AddProjectModal'
import './index.scss'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Sortable from 'sortablejs';

const Projects = ({ projects, getProjects }) => {
    const [show, setShow] = useState(false);
    const [editedProjectData, setEditedProjectData] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('name')
    const [projectsList, setProjectList] = useState(projects)

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

    const getResultsFromQuery = (projects) => {
        if (searchQuery) {
            return projects.filter(project => project[filter].includes(searchQuery))
        }
        return projects
    }

    const projectsToDisplay = getResultsFromQuery(projects)

    console.log(projectsToDisplay, "<----- projectsToDisplay")

    return (
        <>
            <div className='topContainer'>
                <h1 className='projectsTitle'>Projects</h1>
                <Button variant='success' onClick={handleShow}>Add Project</Button>
            </div>

            <AddProjectModal show={show} handleClose={handleClose} editedProjectData={editedProjectData} />

            <Form.Control className='searchInput' placeholder='Search for project...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Form.Label className="formLabel" >Filter by:</Form.Label>

            <Form.Control as="select" size="sm" custom onChange={e => setFilter(e.target.value)} className="projectDropDown" >
                <option value='name'>Title</option>
                <option value='decsription'>Description</option>
            </Form.Control>


            {projectsToDisplay.length
                ? projectsToDisplay && projectsToDisplay.map((project, i) => {
                    return <Project key={i} {...project} editProject={editProject} />
                })
                : <p className='noProjects'>You currently have no projects to view!</p>
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