import React from 'react'
import Modal from 'react-bootstrap/Modal'
import TodoForm from '../TodoForm'

const EditTodoModal = ({ edittingForm, setEdittingForm, updateTodo, addTodo, setTodoDetail }) => {
    const todoId = edittingForm?.id
    const projectId = edittingForm?.projectId

    return (
        <Modal size="xl" show={edittingForm} onHide={() => setEdittingForm(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TodoForm edit={{ todoId, projectId }} selectState={edittingForm?.laneId} updateTodo={updateTodo} addTodo={addTodo} setTodoDetail={setTodoDetail} data={edittingForm} />
            </Modal.Body>
        </Modal>
    )
}

export default EditTodoModal