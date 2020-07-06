import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getProjectList } from '../../redux/actions/projects'
import Project from './Project'
import AddProjectModal from '../AddProjectModal'
import MultiSelect from "react-multi-select-component"
import { getItemFromLocalStorage } from '../../redux/actions/helper'

const Projects = ({ projects, getProjects }) => {
    const users = getItemFromLocalStorage('users')
    console.log('users ????', users)
    const usersForSelect = Object.values(getItemFromLocalStorage('users')).map((user) => ({ label: user.username, value: user.userId }))
    console.log('users >>>>', users)
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div>
            <div style={{ width: '400px' }}>
                <p>Filter by creator:</p>
                {usersForSelect && <MultiSelect
                    options={usersForSelect}
                    value={selected}
                    onChange={setSelected}
                />}
            </div>
            <AddProjectModal show={show} handleClose={handleClose} />

            {projects && projects.map((project) => {
                const creator = users[project.userId]?.username
                return <Project key={project.id} {...project} creator={creator} />
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