import { ChangeEvent, useCallback, useState } from "react"
import { FilterTaskType, ItemTaskType, TaskType } from "../App"
import { AddItemForm } from "../addItemForm/AddItemForm"
import './Todolist.css'
import { EditableSpan } from './../editableSpan/EditableSpan';
import { Checkbox } from './../checkbox/Checkbox';
import { Button } from "./Button";

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
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    console.log('todolist')
   
    const changeTaskTitle = (taskId: string, newTitle: string)=> {
        props.changeTaskTitle(props.todolistId, taskId, newTitle )
    }
    
    const changeTodolistTitle = (newTitle: string)=> {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    const onChangeHandler = (id: string, value: boolean) => props.changeTaskStatus(props.todolistId, id, value)

    const removeTodolist = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }
    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(el => {
            
                return <li>
                    <Checkbox check={el.isDone} callback={(value)=> {onChangeHandler(el.id, value )}}/>

                    {/* <input type="checkbox" checked={el.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => {onChangeHandler(el.id, e.currentTarget.checked )} } /> */}
                    <EditableSpan   title={el.title} 
                                    changeTitle={(newTitle)=>changeTaskTitle(el.id, newTitle)} 
                                    todolistId={props.todolistId}
                                    removeItem = {() => { props.removeTask(props.todolistId, el.id) }}
                                    />
                    {/* <span>{el.title}</span> */}
                </li>
            })}
        </ul>
        : 
        <span> Your task list is empty </span>
        
    const addTask = (titleItem: string) => {
        props.addTask(props.todolistId, titleItem)
    }
    const onAllClickHeandler = useCallback (() => props.changeFilter(props.todolistId, 'all'), [])
    const onComplitedClickHeandler = useCallback (() => props.changeFilter(props.todolistId, 'completed'), [])
    const onActiveClickHeandler = useCallback (() => props.changeFilter(props.todolistId, 'active'), [])

    return (
        <div>
            <EditableSpan   title={props.title} 
                            todolistId={props.todolistId} 
                            changeTitle={(newTitle)=> changeTodolistTitle(newTitle)}
                            removeItem = {()=>removeTodolist(props.todolistId)}/>
            {/* <h3> {props.title}</h3> */}
            <div>
           
                    <AddItemForm callBack={addTask} />

                {/* {userMessageLengthTitle}
                {userMessageStartTyping} */}
            </div>
                {tasksList}
            <div>
                <Button callback={onAllClickHeandler} filter = {props.filter === 'all'? 'active' : '' } title={'all'}  />
                <Button callback={onComplitedClickHeandler} filter = {props.filter === 'completed'? 'active' : ''} title={'active'}/>
                <Button callback={onActiveClickHeandler} filter = {props.filter === 'active' ? 'active' : ''} title={'completed'}/>


                {/* <button onClick={onAllClickHeandler} className={props.filter === 'all' 
                ? 'active' : '' }>All</button>
                <button onClick={onActiveClickHeandler} className={props.filter === 'active' 
                ? 'active' : '' } >Active</button>
                <button onClick={onComplitedClickHeandler} className={props.filter === 'completed' 
                ? 'active' : '' } >Completed</button> */}
            </div>
        </div>
    )
}