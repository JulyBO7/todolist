import React, { useState } from 'react'
import './App.css';
import { Todolist } from './todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm/AddItemForm';

export type ItemTaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskType = Array<ItemTaskType>
export type TodolistsType = {
    id: string
    title: string
    filter: string
}
export type FilterTaskType = 'all' | 'active' | 'completed'


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const addTask = (todolistId: string, titleNewTask: string): void => {
        const task = {
            id: v1(),
            title: titleNewTask,
            isDone: false
        }
        const newTask = {...tasks, [todolistId]: [...tasks[todolistId], task]}
        setTasks(newTask);
    }

    const removeTask = (todolistId: string, taskId: string): void => {
        setTasks ({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId )})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
       setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId 
        ? {...el, isDone: newIsDoneValue} 
        : el ) })
        }
    
    const changeFilter = (todolistId: string, newFilterValue: FilterTaskType) => {
        let todolist = todolists.find(el => el.id === todolistId);
        if (todolist) {
            todolist.filter = newFilterValue
            setTodolists([...todolists])
        }
    }
    const todolistID3 = v1();
    
    const addTodolist =(titleItem: string)=>{
        const newTodolist = {id: todolistID3, title: titleItem, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistID3]: [] })

    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitleValue: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=> el.id === taskId 
            ? {...el, title: newTitleValue } 
            : el)})
    }
    const changeTodolistTitle =(todolistId: string, newTitle: string)=>{
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))

    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {
                todolists.map(todolist => {
                    let taskForTodolist = tasks[todolist.id]
                    if (todolist.filter === 'active') {
                        taskForTodolist = tasks[todolist.id].filter(el => el.isDone === false)
                    }
                    if (todolist.filter === 'completed') {
                        taskForTodolist = tasks[todolist.id].filter(el => el.isDone === true)
                    }
                    return <Todolist key={todolist.id}
                                    todolistId={todolist.id}
                                    title={todolist.title}
                                    tasks={taskForTodolist}
                                    filter={todolist.filter}
                                    changeFilter={changeFilter}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle = {changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle} />

                }
                )
            }


        </div>
    )
}

export default App;
