import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null, 
    isInitialized: false
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
        },
        setInitialized: (state, action: PayloadAction<{ isInitialized: boolean}>)=> {
            state.isInitialized = action.payload.isInitialized
        }

    }
})
export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
