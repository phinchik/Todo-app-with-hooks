import React from 'react'
import { withRouter } from 'react-router-dom'
import { viewProject, deleteProject } from '../../../redux/actions/projects'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './index.scss'

const Project = ({ name, decsription, todos, history, id, viewProject, deleteProject }) => {
    const goToProject = () => {
        const project = {
            name,
            todos,
            id,
            decsription
        }
        viewProject(project)
        history.push(`/projects/${id}`)
    }

    return (
        <>
            <Card className='projectContainer'>
                <Card.Header>
                    <div className='projectHeader'>
                        <h5>{name}</h5>
                        <Button onClick={() => deleteProject(id)} variant='danger'>Delete</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>{decsription}</p>
                        <a href='#' onClick={() => goToProject()}>View</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

const mapDispatchToProps = {
    viewProject,
    deleteProject
}

export default withRouter(connect(null, mapDispatchToProps)(Project))