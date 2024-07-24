import { TasksType } from "../AppWithRedux";
import { ItemTaskType, TaskForUpdateType, TaskStatuses, taskApi } from "../api/todolistApi";
import { errorAppServerHeandler, errorNetworkHeandler } from "../utils/errorsUtil";
import axios from "axios";
import { AppDispatch, AppRootState } from "./store";
import { appActions } from "./appReducer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
                            
export const fetchTasksTC = createAsyncThunk<{tasks: ItemTaskType[], todolistId: string}, string>('tasks/fetchTasksTC', async (todolistId, {dispatch, rejectWithValue})=>{
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let res = await taskApi.setTasks(todolistId)
        dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
        return { tasks: res.data.items, todolistId }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
    }
})
export const addTaskTC = createAsyncThunk<{ task: ItemTaskType, todolistId: string }, { todolistId: string, title: string }>('tasks/addTaskTC', async (arg, { dispatch, rejectWithValue }) => {
    try {
        const taskToAdd = { title: arg.title }
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let res = await taskApi.addTaskTC(arg.todolistId, taskToAdd)
        if (res.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return { todolistId: arg.todolistId, task: res.data.data.item }
        } else {
            errorAppServerHeandler(dispatch, res.data)
            return rejectWithValue(res.data)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
    }
}
)
export const removeTaskTC = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }>('tasks/removeTaskTC', async (arg, { dispatch, rejectWithValue }) => {
    try{
        dispatch(appActions.changeAppStatusAC({status: 'loading'}))
        let res = await taskApi.deleteTask(arg.todolistId, arg.taskId)
        if(res.data.resultCode===0){
            dispatch(appActions.changeAppStatusAC({status: 'succeeded'}))
            return {todolistId: arg.todolistId, taskId: arg.taskId}
        } else{
            errorAppServerHeandler(dispatch,res.data)  
            return rejectWithValue(res.data)  
        }
    } catch (error){
            errorNetworkHeandler(dispatch, error as Error)
            return rejectWithValue(error) 
    } 
})

// export const _removeTaskTC = (todolistId: string, taskId: string)=> {
//     return async (dispatch: AppDispatch)=> {
//         try{
//             dispatch(appActions.changeAppStatusAC({status: 'loading'}))
//             let res = await taskApi.deleteTask(todolistId, taskId)
//             if(res.data.resultCode===0){
//                 dispatch(appActions.changeAppStatusAC({status: 'succeeded'}))
//                 return {todolistId: arg.todolistId, taskId: arg.taskId}
//             } else{
//                 errorAppServerHeandler(dispatch,res.data)  
//                 return rejectWithValue(res.data)  
//             }
//         } catch (error){
//                 errorNetworkHeandler(dispatch, error as Error)
//                 return rejectWithValue(error) 
//         } 
//     }
// }
type TaskChange = Partial<TaskForUpdateType>
export const changeTaskTC = createAsyncThunk<{ todolistId: string, taskId: string, taskChange: TaskChange }, { todolistId: string, taskId: string, taskChange: TaskChange }, { state: AppRootState }>('tasks/changeTaskTC', async (arg, { dispatch, rejectWithValue, getState }) => {
    try {
        const taskToChange = getState().tasks[arg.todolistId].find(task => arg.taskId === task.id)
        if (taskToChange) {
            const taskForRequest = {
                title: taskToChange.title,
                description: taskToChange.description,
                status: taskToChange.status,
                priority: taskToChange.priority,
                startDate: taskToChange.startDate,
                deadline: taskToChange.deadline,
                ...arg.taskChange
            }
            dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
            let res = await taskApi.updateTask(arg.todolistId, arg.taskId, taskForRequest)
            if (res.data.resultCode === 0) {
                dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
                return { todolistId: arg.todolistId, taskId: arg.taskId, taskChange: arg.taskChange }
            } else {
                errorAppServerHeandler(dispatch, res.data)
                return rejectWithValue(res.data)
            }
        } else{
            return rejectWithValue(null)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
    }
}
)


// export const changeTaskTitleTC = (todolistId:string, taskId:string, title: string)=> {
//     return async (dispatch: AppDispatch, getState: ()=> AppRootState)=> {
//         try{
//             const taskForRequest = getState().tasks[todolistId].find(task=> taskId === task.id)
//             if (taskForRequest){
//                 const newTaskForRequest = { title,
//                                             description:taskForRequest.description,
//                                             status: taskForRequest.status,
//                                             priority: taskForRequest.priority,
//                                             startDate: taskForRequest.startDate,
//                                             deadline: taskForRequest.deadline
//                                         }
//                 dispatch(appActions.changeAppStatusAC({status: 'loading'}))                        
//                 let res = await taskApi.updateTask(todolistId,taskId, newTaskForRequest)
//                 if(res.data.resultCode ===0){
//                     dispatch(changeTaskTitleAC(todolistId,taskId,title))
//                     dispatch(appActions.changeAppStatusAC({status: 'succeeded'}))
//                 }else{
//                     errorAppServerHeandler(dispatch,res.data)        
//                 }
//             }
//         } catch(error){
//             if(axios.isAxiosError(error)){
//                 if(error.response){
//                     errorNetworkHeandler(dispatch, error.response.data)
//                 } else{
//                     errorNetworkHeandler(dispatch, error)
//                 }
//             } else{
//                 errorNetworkHeandler(dispatch, error as Error)
//             }
//         }
   
       
//     }
// }



const initialState: TasksType = {}
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchTasksTC.fulfilled, (state, action)=>{
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTaskTC.fulfilled, (state, action)=>{
                state[action.payload.todolistId].unshift(action.payload.task)
            })
            .addCase(removeTaskTC.fulfilled, (state, action)=>{
                let index = state[action.payload.todolistId].findIndex(task=>task.id === action.payload.taskId)
                if(index !== -1 ) state[action.payload.todolistId].splice(index, 1)
            })
             .addCase(changeTaskTC.fulfilled, (state, action)=>{
                let index = state[action.payload.todolistId].findIndex(task=>task.id === action.payload.taskId)
                if(index !== -1 ) {
                    state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.taskChange }
                }
            })
    }
})
export const tasksReducer = tasksSlice.reducer

// export const _asksReducer = (state = initialState , action: TaskReducerActionType): TasksType  => {
//     switch (action.type) {
//         case 'ADD-TASK': 
//            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]}
//         case 'REMOVE-TASK': 
//             return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter((el:ItemTaskType) => el.id !== action.payload.taskId) }
//         case 'CHANGE-TASK-STATUS': 
//             return {
//                 ...state, [action.payload.todolistId]: state[action.payload.todolistId].map((el: ItemTaskType) => el.id === action.payload.taskId
//                     ? { ...el, status: action.payload.newStatus} : el)}
//         case 'CHANGE-TASK-TITLE': 
//             return {
//                 ...state, [action.payload.todolistId]: state[action.payload.todolistId].map((el: ItemTaskType) => el.id === action.payload.taskId
//                     ? { ...el, title: action.payload.newTitleValue } : el)}
//         case 'ADD-TODOLIST':
//             return {...state, [action.payload.todo.id]: []}
//         case 'REMOVE-TODOLIST':
//             const newState = {...state}
//             delete newState[action.payload.todolistId]
//             return newState
//         case 'SET-TODOLISTS':
//             let newTasksState = {} as TasksType
//             action.payload.todos.forEach(todos => {
//                 newTasksState[todos.id] = []
//             }
//             )
//             return newTasksState
//         case 'SET-TASKS':
//             const newTasks={...state, [action.todolistId]: action.tasks} 
//             return newTasks
//         default: return state
//     }
// }

