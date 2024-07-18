import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { error } from "console"

// type ActionType = ChangeAppStatusActionType | SetAppErrorActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        }
    }
})
export const appReducer = appSlice.reducer
export const appActions = appSlice.actions


// export const appReducer = (state=initialState, action: ActionType)=> {
//     switch(action.type){
//         case 'CHANGE-APP-STATUS': 
//         return {...state, appStatus: action.status }
//         case 'SET-APP-ERROR': 
//         return {...state, appError: action.error }
        
//         default: return state
//     }
// }
// export const changeAppStatusAC = (status:RequestStatusType)=>({type:'CHANGE-APP-STATUS' as const, status})
// export const setAppErrorAC = (error:string | null)=>({type:'SET-APP-ERROR' as const, error})

// export type ChangeAppStatusActionType = ReturnType <typeof changeAppStatusAC>
// export type SetAppErrorActionType = ReturnType <typeof setAppErrorAC>


