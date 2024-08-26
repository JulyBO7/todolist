import { autnApi } from '../api/authApi'
import { handleServerAppError, handleNetworkError } from '../../../common/utils'
import { appActions } from '../../../app/appReducer'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type FormType = {
    email: string
    password: string
    rememberMe: boolean
}
const initialState = {
    isLoggedIn: false
}
export const logIn = createAsyncThunk<{ isLoggedIn: boolean }, FormType>('auth/logIn', async (arg, { dispatch, rejectWithValue }) => {
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        const result = await autnApi.logIn(arg)
        if (result.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: true }
        } else {
            return handleServerAppError(dispatch, rejectWithValue, result.data)
        }
    } catch (error) {
        return handleNetworkError(dispatch, rejectWithValue, error as Error)
    }
}
)
export const setIsLoggedIn = createAsyncThunk<{ isLoggedIn: boolean }, void>('auth/setIsLoggedIn', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        const result = await autnApi.me()
        if (result.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: true }
        } else {
            return handleServerAppError(dispatch, rejectWithValue, result.data)
        }
    } catch (error) {
        return handleNetworkError(dispatch, rejectWithValue, error as Error)
    } finally{
        dispatch(appActions.setInitialized({ isInitialized: true }))
    }
})
export const logOut = createAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logOut', async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(appActions.changeAppStatusAC({ status: 'loading' }))
        let result = await autnApi.logOut()
        if (result.data.resultCode === 0) {
            dispatch(appActions.changeAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: false }
        } else {
            return handleServerAppError(dispatch, rejectWithValue, result.data)
        }
    } catch (error) {
        return handleNetworkError(dispatch, rejectWithValue, error as Error)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(setIsLoggedIn.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }
})
export const authReducer = authSlice.reducer