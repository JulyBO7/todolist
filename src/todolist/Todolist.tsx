import { memo, useCallback, useState } from "react"
import { FilterTaskType, ItemTaskType, TaskType } from "../App"
import { AddItemForm } from "../addItemForm/AddItemForm"
import './Todolist.css'
import { EditableSpan } from './../editableSpan/EditableSpan';
import { FilterButton } from "./Button";
import { Task } from "../Task";

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

export const Todolist = memo((props: TodolistPropsType) => {
    console.log('todolist')
   
    const changeTaskTitle = useCallback((taskId: string, newTitle: string)=> {
        props.changeTaskTitle(props.todolistId, taskId, newTitle )
    }, [props.changeTaskTitle, props.todolistId])
    
    const changeTodolistTitle = useCallback((newTitle: string)=> {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }, [props.changeTodolistTitle, props.todolistId])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])

    const addTask = useCallback((titleItem: string) => {
        props.addTask(props.todolistId, titleItem)
    }, [props.addTask, props.todolistId])

    const onAllClickHeandler = useCallback(() => props.changeFilter(props.todolistId, 'all'), [])
    const onComplitedClickHeandler = useCallback(() => props.changeFilter(props.todolistId, 'completed'), [])
    const onActiveClickHeandler = useCallback(() => props.changeFilter(props.todolistId, 'active'), [])

    return (
        <div>
            <h3><EditableSpan   title={props.title} 
                            todolistId={props.todolistId} 
                            changeTitle={changeTodolistTitle}
                            removeItem = {removeTodolist}/>
            </h3>
            <div>
                <AddItemForm addItem={addTask} />
            </div>
                {props.tasks.map(task => <Task  key={task.id}  
                                                todolistId ={props.todolistId}
                                                taskId ={task.id}
                                                isDone={task.isDone}
                                                title={task.title}
                                                changeTaskTitle={changeTaskTitle}
                                                removeTask={props.removeTask}
                                                changeTaskStatus={props.changeTaskStatus} 
                
                                                // <TaskWithRedux  key={task.id} 
                                                // todolistId ={props.todolistId} 
                                                // taskId ={task.id}
                                                />)}
            <div>
                <FilterButton callback={onAllClickHeandler} filter = {props.filter === 'all'? 'active' : '' } title={'all'}  />
                <FilterButton callback={onComplitedClickHeandler} filter = {props.filter === 'completed'? 'active' : ''} title={'active'}/>
                <FilterButton callback={onActiveClickHeandler} filter = {props.filter === 'active' ? 'active' : ''} title={'completed'}/>

            </div>
        </div>
    )
})