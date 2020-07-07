import React from 'react'
import { withRouter } from 'react-router-dom'
import { viewProject, deleteProject } from '../../../redux/actions/projects'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Project = ({ name, decsription, todos, history, id, viewProject, deleteProject, creator }) => {
    const goToProject = () => {
        const project = {
            name,
            todos,
            id
        }
        viewProject(project)
        history.push(`/projects/${id}`)
    }

    return (
        <div>
            <Card style={{ margin: '2rem auto' }}>
                <Card.Header as="h5">Name: {name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Description: {decsription}
                    </Card.Text>
                    <Card.Text>
                        {`Number of todos: ${todos && todos.length}`}
                        <Button onClick={() => goToProject()} variant="primary">View Project</Button>
                        <Button onClick={() => deleteProject(id)} variant="primary">Delete Project</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

const mapDispatchToProps = {
    viewProject,
    deleteProject
}

export default withRouter(connect(null, mapDispatchToProps)(Project))