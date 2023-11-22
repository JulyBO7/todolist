import { useState } from "react"
import { FilterTaskType, ItemTaskType, TaskType } from "../App"
import { AddItemForm } from "../addItemForm/AddItemForm"
import './Todolist.css'
import { EditableSpan } from './../editableSpan/EditableSpan';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType
    filter: string
    changeFilter: (todolistId: string, newFilterValue: FilterTaskType) => void
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, newTask: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitleValue: string)=> void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void

}

export const Todolist = (props: TodolistPropsType) => {
   
    const changeTaskTitle = (taskId: string, newTitle: string)=> {
        props.changeTaskTitle(props.todolistId, taskId, newTitle )
    }
    
    const changeTodolistTitle = (newTitle: string)=> {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(el => {
            
                return <li>
                    <input type="checkbox" checked={el.isDone} onChange={
                                        (e) => props.changeTaskStatus(props.todolistId, el.id, e.currentTarget.checked)} />
                    <EditableSpan title={el.title} changeTitle={(newTitle)=>changeTaskTitle(el.id, newTitle)} todolistId={props.todolistId} />
                    {/* <span>{el.title}</span> */}
                    <button onClick={() => { props.removeTask(props.todolistId, el.id) }}> x </button>
                </li>
            })}
        </ul>
        : 
        <span> Your task list is empty </span>
        
    const addTask = (titleItem: string) => {
        props.addTask(props.todolistId, titleItem)
    }


    return (
        <div>
            <EditableSpan title={props.title} todolistId={props.todolistId} changeTitle={(newTitle)=> changeTodolistTitle(newTitle)}/>
            {/* <h3> {props.title}</h3> */}
            <div>
           
                    <AddItemForm callBack={addTask} />

                {/* {userMessageLengthTitle}
                {userMessageStartTyping} */}
            </div>
                {tasksList}
            <div>
                <button onClick={() => props.changeFilter(props.todolistId, 'all')} className={props.filter === 'all' 
                ? 'active' : '' }>All</button>
                <button onClick={() => props.changeFilter(props.todolistId, 'active')} className={props.filter === 'active' 
                ? 'active' : '' } >Active</button>
                <button onClick={() => props.changeFilter(props.todolistId, 'completed')} className={props.filter === 'completed' 
                ? 'active' : '' } >Completed</button>
            </div>
        </div>
    )
}