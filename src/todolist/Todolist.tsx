import { memo, useCallback, useEffect, useState } from "react"
import { FilterTaskType } from "../AppWithRedux"
import { AddItemForm } from "../addItemForm/AddItemForm"
import './Todolist.css'
import { EditableSpan } from './../editableSpan/EditableSpan';
import { FilterButton } from "./Button";
import { Task } from "../Task";
import { AppRootStateType, useAppDispatch } from "../state/store";
import { ItemTaskType, TaskStatuses } from "../api/todolistApi";
import { addTasksTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskAC, removeTaskTC, setTasksTC } from "../state/tasksReducer";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button'
import { changeFilterAC, removeTodolistTC, updateTitleTodolistTC } from "../state/todolistsReducer";

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterTaskType
}
export const Todolist = memo((props: TodolistPropsType) => {
    console.log('todolist')
    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootStateType, ItemTaskType[]>(state => state.tasks[props.todolistId])
    useEffect(() => {
        dispatch(setTasksTC(props.todolistId))
    }, [])
    const changeFilter = useCallback((newFilterValue: FilterTaskType) => {
        dispatch(changeFilterAC(props.todolistId, newFilterValue))
    }, [dispatch])
    const removeTodolist = useCallback(()=> {
        dispatch(removeTodolistTC(props.todolistId))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(updateTitleTodolistTC(props.todolistId, newTitle))
    }, [dispatch])

    const addTask = useCallback((titleNewTask: string): void => {
        dispatch(addTasksTC(props.todolistId,titleNewTask))
    }, [dispatch])
    const removeTask = useCallback((taskId: string): void => {
        dispatch(removeTaskTC(props.todolistId, taskId))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: TaskStatuses) => {
        dispatch(changeTaskStatusTC(props.todolistId, taskId, newIsDoneValue))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitleValue: string) => {
        dispatch(changeTaskTitleTC(props.todolistId, taskId, newTitleValue)) 
    }, [dispatch])

    const onAllClickHeandler = useCallback(() => changeFilter('all'), [])
    const onComplitedClickHeandler = useCallback(() => changeFilter('completed'), [])
    const onActiveClickHeandler = useCallback(() => changeFilter('active'), [])

    let filteredTasks = tasks
    if (props.filter === 'active') {
        filteredTasks = tasks.filter((el: ItemTaskType) => el.status !== TaskStatuses.Completed)
    }
    if (props.filter === 'completed') {
        filteredTasks = tasks.filter((el: ItemTaskType) => el.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title}
                todolistId={props.todolistId}
                changeTitle={changeTodolistTitle}
                removeItem={removeTodolist} />
            </h3>
            <div>
                <AddItemForm addItem={addTask} />
            </div>
            {filteredTasks.map(task => <Task key={task.id}
                                            taskId={task.id}
                                            status={task.status}
                                            todolistId={props.todolistId}
                                            title={task.title}
                                            changeTaskTitle={changeTaskTitle}
                                            removeTask={removeTask}
                                            changeTaskStatus={changeTaskStatus} />)}
            <div>
                <Button onClick={onAllClickHeandler} size="small" color="success" variant={props.filter === "all" ? "outlined" : "text"} title={'all'}> All </Button>
                <Button onClick={onComplitedClickHeandler} size="small" color="success" variant={props.filter === "completed" ? "outlined" : "text"} title={'active'} >Completed </Button>
                <Button onClick={onActiveClickHeandler} size="small" color="success" variant={props.filter === "active" ? "outlined" : "text"} title={'completed'} > Active </Button>
            </div >
        </div >
    )
})