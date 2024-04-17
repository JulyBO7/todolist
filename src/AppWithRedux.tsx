import { useCallback, useReducer } from 'react'
import './App.css';
import { Todolist } from './todolist/Todolist';
import { AddItemForm } from './addItemForm/AddItemForm';
import { addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolistsReducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export type ItemTaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskType = Array<ItemTaskType>

export type TasksType = {
    [todolistID: string]: TaskType

}

export type TodolistType = {
    id: string
    title: string
    filter: string
}
export type FilterTaskType = 'all' | 'active' | 'completed'


function AppWithRedux() {

    console.log('AppWithRedux')
   
    let tasks = useSelector<AppRootStateType,TasksType >(state => state.tasks)
    let todolists = useSelector<AppRootStateType,TodolistType[]>(state => state.todolists)
    let dispatch = useDispatch()
    
    const addTask = useCallback((todolistId: string, titleNewTask: string): void => {
        dispatch(addTaskAC(todolistId, titleNewTask))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string): void => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitleValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitleValue)) 
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, newFilterValue: FilterTaskType) => {
        dispatch(changeFilterAC(todolistId, newFilterValue))
    }, [dispatch])

    const addTodolist = useCallback((titleItem: string) => {
        dispatch(addTodolistAC(titleItem))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string)=> {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [dispatch])

    return (
        <div>
            <AppBar position="static" color="success">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={4} rowSpacing={1} >
                    {todolists.map(todolist => {
                            let taskForTodolist = tasks[todolist.id]
                            if (todolist.filter === 'active') {
                                taskForTodolist = tasks[todolist.id].filter((el: any) => el.isDone === false)
                            }
                            if (todolist.filter === 'completed') {
                                taskForTodolist = tasks[todolist.id].filter((el: any) => el.isDone === true)
                            }
                            return (
                                <Grid item>
                                    <Paper>
                                        <Todolist key={todolist.id}
                                            todolistId={todolist.id}
                                            title={todolist.title}
                                            tasks={taskForTodolist}
                                            filter={todolist.filter}
                                            changeFilter={changeFilter}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                            removeTodolist={removeTodolist}
                                        />
                                    </Paper>
                                </Grid>)
                        }
                        )
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
 