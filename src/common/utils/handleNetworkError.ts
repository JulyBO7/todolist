import { isAxiosError } from "axios"
import { appActions } from "../../app/appReducer"

export const handleNetworkError = (dispatch: any, rejectWithValue: any, error: { message: string }) => {
    if (isAxiosError(error)) {
        if (error.response?.data) {
            dispatch(appActions.setAppErrorAC({ error: error.response.data }))
        } else {
            dispatch(appActions.setAppErrorAC({ error: error.message }))
        }
    } else {
        dispatch(appActions.setAppErrorAC({ error: error.message }))
    }
    dispatch(appActions.changeAppStatusAC({ status: 'failed' }))
    return rejectWithValue(error)
}

