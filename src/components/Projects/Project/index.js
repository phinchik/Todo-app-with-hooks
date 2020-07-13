import React from 'react'
import { withRouter } from 'react-router-dom'
import { viewProject, deleteProject } from '../../../redux/actions/projects'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './index.scss'

const Project = ({ name, description, todos, history, id, viewProject, deleteProject }) => {
    console.log('name >>>>', name)
    const goToProject = () => {
        const project = {
            name,
            todos,
            id,
            description
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
                        <>{description}</>
                        <a style={{ display: 'block', marginTop: '5px' }} href='#' onClick={() => goToProject()}>View</a>
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