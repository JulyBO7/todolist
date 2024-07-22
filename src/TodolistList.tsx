import { useSelector } from "react-redux"
import { AppRootState, useAppDispatch } from "./state/store"
import { TodolistType } from "./AppWithRedux"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Todolist } from "./todolist/Todolist"
import { useCallback, useEffect } from "react"
import { addTodolist, fetchTodolists } from "./state/todolistsReducer"
import { Navigate } from "react-router-dom"
import Container from "@mui/material/Container"
import { AddItemForm } from "./addItemForm/AddItemForm"

export const TodolistsList = () => {
    console.log("TodolistsList")
    const isAuth = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const dispatch = useAppDispatch()
    
    const addTodolist = useCallback((titleItem: string) => {
        dispatch(addTodolist(titleItem))
    }, [dispatch])

    useEffect(() => {
        if (!isAuth) return 
        console.log('effect TodolistsList ')
        dispatch(fetchTodolists())
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



