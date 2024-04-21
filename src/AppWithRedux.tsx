import { useCallback, useEffect} from 'react'
import './App.css';
import { Todolist } from './todolist/Todolist';
import { AddItemForm } from './addItemForm/AddItemForm';
import {  addTodolistTC, setTodolistsTC} from './state/todolistsReducer';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './state/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ItemTaskType} from './api/todolistApi';
import { RequestStatusType } from './state/appReducer';
import LinearProgress from '@mui/material/LinearProgress';


export type TasksType = {
    [todolistID: string]: Array<ItemTaskType>
}
export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    order: number
    addedDate: Date
} & {filter: FilterTaskType}

function AppWithRedux() {
    console.log('AppWithRedux')
    let todolists = useSelector<AppRootStateType,TodolistType[]>(state => state.todolists)
    let status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.appStatus)
    let dispatch = useAppDispatch()
    
    useEffect(()=> {
            dispatch(setTodolistsTC())
    }, [])

    const addTodolist = useCallback((titleItem: string) => {
        dispatch(addTodolistTC(titleItem))
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
            {status === "loading" && <LinearProgress color="inherit" />}
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={4} rowSpacing={1} >
                    {todolists.map(todolist => {
                            return (
                                <Grid item  key={todolist.id}>
                                    <Paper>
                                        <Todolist
                                            todolistId={todolist.id}
                                            title={todolist.title}
                                            filter={todolist.filter}
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
 