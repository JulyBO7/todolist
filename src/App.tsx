import React, { useReducer } from 'react'
import './App.css';
import { Todolist } from './todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm/AddItemForm';
import { TodolistReducerActionType, addTodolistAC, changeFilterAC, changeTodolistTitleAC, todolistReducer } from './reducer/todolist-reducer';
import { addPureTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer } from './reducer/task-reducer';

export type ItemTaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskType = Array<ItemTaskType>

export type TasksType = {
    [todolistID: string]: TaskType

}

export type TodolistsType = {
    id: string
    title: string
    filter: string
}
export type FilterTaskType = 'all' | 'active' | 'completed'


let todolistID1 = v1()
let todolistID2 = v1()

function App() {


    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])
    let [todolists, dispatchTodolists] = useReducer(todolistReducer,
        [
            { id: todolistID1, title: 'What to learn', filter: 'all' },
            { id: todolistID2, title: 'What to buy', filter: 'all' }
        ])


    // let [tasks, setTasks] = useState({
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ]
    // })

    let [tasks, dispatchTask] = useReducer(taskReducer, {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })
    
    const addTask = (todolistId: string, titleNewTask: string): void => {
        dispatchTask(addTaskAC(todolistId, titleNewTask))
    }

    const removeTask = (todolistId: string, taskId: string): void => {
        dispatchTask(removeTaskAC(todolistId, taskId))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        dispatchTask(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))
        //    setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId 
        //     ? {...el, isDone: newIsDoneValue} 
        //     : el ) })
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitleValue: string) => {
        dispatchTask(changeTaskTitleAC(todolistId, taskId, newTitleValue))
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=> el.id === taskId 
        //     ? {...el, title: newTitleValue } 
        //     : el)})
    }

    const changeFilter = (todolistId: string, newFilterValue: FilterTaskType) => {
        dispatchTodolists(changeFilterAC(todolistId, newFilterValue))

        // let todolist = todolists.find(el => el.id === todolistId);
        // if (todolist) {
        //     todolist.filter = newFilterValue
        //     setTodolists([...todolists])
        // }
    }
    const todolistID3 = v1();

    const addTodolist = (titleItem: string) => {
        dispatchTodolists(addTodolistAC(titleItem, todolistID3))
        dispatchTask(addPureTaskAC(todolistID3))
        // const newTodolist = {id: todolistID3, title: titleItem, filter: 'all'}
        // setTodolists([...todolists, newTodolist])
        // setTasks({...tasks, [todolistID3]: [] })

    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, newTitle))
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist} />
            {
                todolists.map(todolist => {
                    let taskForTodolist = tasks[todolist.id]
                    if (todolist.filter === 'active') {
                        taskForTodolist = tasks[todolist.id].filter((el: any) => el.isDone === false)
                    }
                    if (todolist.filter === 'completed') {
                        taskForTodolist = tasks[todolist.id].filter((el: any) => el.isDone === true)
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
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle} />
                }
                )
            }
        </div>
    )
}

export default App;
