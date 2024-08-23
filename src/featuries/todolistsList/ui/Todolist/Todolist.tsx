import { memo, useCallback, useEffect, useState } from "react"
import { FilterTaskType } from "../../../../app/App"
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm"
import './Todolist.css'
import { EditableSpan } from '../../../../common/components/EditableSpan/EditableSpan';
import { Task } from "../Task/Task";
import { AppRootState } from "../../../../app/store";
import {useAppDispatch} from '../../../../common/hooks'
import { ItemTaskType } from "../../../../featuries/todolistsList/api/tasksApi";
import {TaskStatuses} from '../../../../common/enums'
import { useSelector } from "react-redux";
import Button from '@mui/material/Button'
import { removeTodolist, todolistsActions, updateTodolist } from "../../model/todolistsReducer";
import { addTaskTC, changeTaskTC, fetchTasksTC, removeTaskTC } from "../../model/tasksReducer";

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterTaskType
}
export const Todolist = memo((props: TodolistPropsType) => {
    console.log('todolist')
    
    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootState, ItemTaskType[]>(state => state.tasks[props.todolistId])
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])
    const changeFilter = useCallback((newFilterValue: FilterTaskType) => {
        dispatch(todolistsActions.changeFilterAC({todolistId: props.todolistId, filter: newFilterValue}))
    }, [dispatch])
    const deleteTodolist = useCallback(()=> {
        dispatch(removeTodolist(props.todolistId))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(updateTodolist({id: props.todolistId, title: newTitle}))
    }, [dispatch])

    const addTask = useCallback((titleNewTask: string): void => {
        dispatch(addTaskTC({todolistId: props.todolistId,title: titleNewTask}))
    }, [dispatch])
    const removeTask = useCallback((taskId: string): void => {
        dispatch(removeTaskTC({todolistId: props.todolistId, taskId}))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: TaskStatuses) => {
        dispatch(changeTaskTC({todolistId: props.todolistId, taskId, taskChange: {status: newIsDoneValue}}))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitleValue: string) => {
        dispatch(changeTaskTC({todolistId: props.todolistId, taskId, taskChange: {title: newTitleValue}})) 
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
                removeItem={deleteTodolist} />
            </h3>
            <div>
                <AddItemForm addItem={addTask} />
            </div>
            {filteredTasks?.map(task => <Task key={task.id}
                                            taskId={task.id}
                                            status={task.status}
                                            todolistId={props.todolistId}
                                            title={task.title}
                                            changeTaskTitle={changeTaskTitle}
                                            removeTask={removeTask}
                                            changeTask={changeTaskStatus} />)}
            <div>
                <Button onClick={onAllClickHeandler} size="small" color="success" variant={props.filter === "all" ? "outlined" : "text"} title={'all'}> All </Button>
                <Button onClick={onComplitedClickHeandler} size="small" color="success" variant={props.filter === "completed" ? "outlined" : "text"} title={'active'} >Completed </Button>
                <Button onClick={onActiveClickHeandler} size="small" color="success" variant={props.filter === "active" ? "outlined" : "text"} title={'completed'} > Active </Button>
            </div >
        </div >
    )
})