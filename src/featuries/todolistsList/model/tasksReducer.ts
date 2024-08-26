import { TasksType } from '../../../app/App';
import { ItemTaskType, TaskForUpdateType,taskApi } from '../../todolistsList/api/tasksApi';
import { handleServerAppError, handleNetworkError } from '../../../common/utils';
import { AppRootState } from '../../../app/store';
import { appActions } from '../../../app/appReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
                            
const fetchTasks = createAsyncThunk<{tasks: ItemTaskType[], todolistId: string}, string>('tasks/fetchTasksTC', async (todolistId, {dispatch, rejectWithValue})=>{
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let res = await taskApi.setTasks(todolistId)
        dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
        return { tasks: res.data.items, todolistId }
    } catch (error) {
        handleNetworkError(dispatch, error as Error)
        return rejectWithValue(error)
    }
})
const addTask = createAsyncThunk<{ task: ItemTaskType, todolistId: string }, { todolistId: string, title: string }>('tasks/addTaskTC', async (arg, { dispatch, rejectWithValue }) => {
    try {
        const taskToAdd = { title: arg.title }
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let res = await taskApi.addTaskTC(arg.todolistId, taskToAdd)
        if (res.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return { todolistId: arg.todolistId, task: res.data.data.item }
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(res.data)
        }
    } catch (error) {
        handleNetworkError(dispatch, error as Error)
        return rejectWithValue(error)
    }
}
)
const removeTask = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }>('tasks/removeTaskTC', async (arg, { dispatch, rejectWithValue }) => {
    try{
        dispatch(appActions.changeAppStatusAC({status: 'loading'}))
        let res = await taskApi.deleteTask(arg.todolistId, arg.taskId)
        if(res.data.resultCode===0){
            dispatch(appActions.changeAppStatusAC({status: 'succeeded'}))
            return {todolistId: arg.todolistId, taskId: arg.taskId}
        } else{
            handleServerAppError(dispatch,res.data)  
            return rejectWithValue(res.data)  
        }
    } catch (error){
            handleNetworkError(dispatch, error as Error)
            return rejectWithValue(error) 
    } 
})

export type DomainModelTask = Partial<TaskForUpdateType>
const changeTask = createAsyncThunk<{ todolistId: string, taskId: string, domainModel: DomainModelTask }, { todolistId: string, taskId: string, domainModel: DomainModelTask }, { state: AppRootState }>('tasks/changeTaskTC', async (arg, { dispatch, rejectWithValue, getState }) => {
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
                ...arg.domainModel
            }
            dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
            let res = await taskApi.updateTask(arg.todolistId, arg.taskId, taskForRequest)
            if (res.data.resultCode === 0) {
                dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
                return { todolistId: arg.todolistId, taskId: arg.taskId, domainModel: arg.domainModel }
            } else {
                handleServerAppError(dispatch, res.data)
                return rejectWithValue(res.data)
            }
        } else{
            return rejectWithValue(null)
        }
    } catch (error) {
        handleNetworkError(dispatch, error as Error)
        return rejectWithValue(error)
    }
}
)

const initialState: TasksType = {}
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchTasks.fulfilled, (state, action)=>{
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action)=>{
                state[action.payload.todolistId].unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action)=>{
                let index = state[action.payload.todolistId].findIndex(task=>task.id === action.payload.taskId)
                if(index !== -1 ) state[action.payload.todolistId].splice(index, 1)
            })
             .addCase(changeTask.fulfilled, (state, action)=>{
                let index = state[action.payload.todolistId].findIndex(task=>task.id === action.payload.taskId)
                if(index !== -1 ) {
                    state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.domainModel }
                }
            })
    }
})
export const tasksAsyncActions = {
    fetchTasks,
    addTask,
    removeTask,
    changeTask
}