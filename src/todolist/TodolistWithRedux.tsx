import { ChangeEvent, useState } from "react"
import { FilterTaskType, ItemTaskType, TaskType, TasksType } from "../App"
import { AddItemForm } from "../addItemForm/AddItemForm"
import './Todolist.css'
import { EditableSpan } from './../editableSpan/EditableSpan';
import { TaskCheckbox } from '../checkbox/TaskCheckbox';
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../state/tasksReducer";

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: string
    // changeFilter: (todolistId: string, newFilterValue: FilterTaskType) => void
    // removeTask: (todolistId: string, taskId: string) => void
    // addTask: (todolistId: string, newTask: string) => void
    // changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    // changeTaskTitle: (todolistId: string, taskId: string, newTitleValue: string)=> void
    // changeTodolistTitle: (todolistId: string, newTitle: string) => void
    // removeTodolist: (todolistId: string) => void
}

const TodolistWitnRedux = (props: TodolistPropsType) => {

    let tasks = useSelector<AppRootStateType,TasksType>(state => state.tasks)
    let dispatch = useDispatch()

    let allTasks = tasks[props.todolistId]


    // let tasksForTodolist = 
    //  if (props.filter === 'active'){
    //     tasksForTodolist = allTasks.filter(t => t.isDone === false)
    //  }

    const addTask = (titleNewTask: string): void => {
        dispatch(addTaskAC(props.todolistId, titleNewTask))
    }
    const changeTaskTitle = (taskId: string, newTitle: string)=> {
        dispatch(changeTaskTitleAC(props.todolistId, taskId, newTitle))    
    }
    
    const removeTask = (todolistId: string, taskId: string): void => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    
    // const changeTodolistTitle = (newTitle: string)=> {
    //     props.changeTodolistTitle(props.todolistId, newTitle)
    // }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))
    }

    // const removeTodolist = (todolistId: string) => {
    //     props.removeTodolist(todolistId)
    // }
    const tasksList: JSX.Element = tasks[props.todolistId].length
        ? <ul>
            {tasks[props.todolistId].map(el => {
            
                return <li>
                    <TaskCheckbox check={el.isDone} changeStatus={(value)=> changeTaskStatus(props.todolistId,el.id, value )}/>

                    {/* <input type="checkbox" checked={el.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => {onChangeHandler(el.id, e.currentTarget.checked )} } /> */}
                    <EditableSpan   title={el.title} 
                                    changeTitle={(newTitle)=>changeTaskTitle(el.id, newTitle)} 
                                    todolistId={props.todolistId}
                                    removeItem = {() => { removeTask(props.todolistId, el.id) }}
                                    />
                    {/* <span>{el.title}</span> */}
                </li>
            })}
        </ul>
        : 
        <span> Your task list is empty </span>
        
    
    return (
        <div>
            {/* <EditableSpan   title={props.title} 
                            todolistId={props.todolistId} 
                            changeTitle={(newTitle)=> changeTodolistTitle(newTitle)}
                            removeItem = {()=>removeTodolist(props.todolistId)}/> */}
            <h3> {props.title}</h3>
            <div>
           
                    <AddItemForm addItem={addTask} />

                {/* {userMessageLengthTitle}
                {userMessageStartTyping} */}
            </div>
                {tasksList}
            <div>
                <button  className={props.filter === 'all' 
                ? 'active' : '' }>All</button>
                <button  className={props.filter === 'active' 
                ? 'active' : '' } >Active</button>
                <button  className={props.filter === 'completed' 
                ? 'active' : '' } >Completed</button>
            </div>
        </div>
    )
}