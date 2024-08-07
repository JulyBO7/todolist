import { autnApi } from "../api/todolistApi"
import { errorAppServerHeandler, errorNetworkHeandler } from "../utils/errorsUtil"
import { appActions } from "../state/appReducer"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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
            errorAppServerHeandler(dispatch, result.data)
            return rejectWithValue(result.data)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
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
            errorAppServerHeandler(dispatch, result.data)
            return rejectWithValue(result.data)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
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
            errorAppServerHeandler(dispatch, result.data)
            return rejectWithValue(result.data)
        }
    } catch (error) {
        errorNetworkHeandler(dispatch, error as Error)
        return rejectWithValue(error)
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


