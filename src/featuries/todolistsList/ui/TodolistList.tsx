import { useSelector } from "react-redux"
import { AppRootState} from "../../../app/store"
import {useAppDispatch} from '../../../common/hooks'
import { TodolistType } from "../../../app/App"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { useCallback, useEffect } from "react"
import { addTodolistTC, fetchTodolistsTC } from "../model/todolistsReducer"
import { Navigate } from "react-router-dom"
import Container from "@mui/material/Container"
import { AddItemForm } from "../../../common/components/AddItemForm/AddItemForm"

export const TodolistsList = () => {
    console.log("TodolistsList")
    const isAuth = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const dispatch = useAppDispatch()
    debugger
    
    const addTodolist = useCallback((titleItem: string) => {
        dispatch(addTodolistTC(titleItem))
    }, [dispatch])

    useEffect(() => {
        if (!isAuth) return 
        console.log('effect TodolistsList ')
        dispatch(fetchTodolistsTC())
    }, [])

    if (!isAuth) return <Navigate to='/login' />
    return (
        <Container fixed>
            <Grid container>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={4} rowSpacing={1} >
                {todolists.map(todolist => {
                    return (
                        <Grid item key={todolist.id}>
                            <Paper>
                                <Todolist
                                    todolistId={todolist.id}
                                    title={todolist.title}
                                    filter={todolist.filter}
                                />
                            </Paper>
                        </Grid>
                    )
                })
                }
            </Grid>
        </Container>
    )
}



