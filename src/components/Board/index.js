import React, { useState } from 'react'
import TrelloBoard from 'react-trello'
import TodoForm from '../TodoForm'
import Card from 'react-bootstrap/Card'
import moment from "moment"

const Board = ({ todos, updateTodo, addTodo, setTodoDetail, todoDetails, editForm, deleteTodo, onHandleSaveProject, projectId }) => {
    const onCardDelete = (cardId, laneId) => {
        deleteTodo(cardId, projectId)
    }

    const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === cardId) {
                return { ...todo, selectState: toLaneId }
            }
            return todo
        })

        onHandleSaveProject(updatedTodos)
    }

    const getCards = (id) => {
        return todos.filter((todo) => {
            return todo.selectState === id
        })
    }

    const data = {
        lanes: [
            {
                id: 'todo',
                date: 'TEST',
                title: 'TODO',
                cards: getCards("todo")
            },
            {
                id: 'progress',
                title: 'In Progress',
                cards: getCards("progress")
            },
            {
                id: 'done',
                title: 'Done',
                cards: getCards("done")
            }
        ]
    }

    const components = {
        NewCardForm: (data) => {
            return <TodoForm selectState={data.laneId} updateTodo={updateTodo} addTodo={addTodo} setTodoDetail={setTodoDetail} {...todoDetails} data={data} />
        },
        Card: (data) => {
            const cardId = data.id
            const laneId = data.laneId
            return (
                <div style={{ background: 'white', margin: '0.5rem 0' }}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Title: {data && data.title}</Card.Title>
                            <Card.Text>
                                Description: {data.description}
                            </Card.Text>
                            <footer>
                                Due Date: {data && moment(data.date).format("YYYY/MM/DD")}
                            </footer>
                            <a href='#' onClick={() => editForm(data, projectId)}>edit</a><br />
                            <a href='#' onClick={() => data.onDelete(cardId, laneId)}>delete</a>
                        </Card.Body>

                    </Card>
                </div>
            )
        }
    }

    return (
        <TrelloBoard
            draggable
            data={data}
            onCardDelete={onCardDelete}
            onCardMoveAcrossLanes={onCardMoveAcrossLanes}
            editable
            className='board'
            components={components}
        />
    )
}

export default Board