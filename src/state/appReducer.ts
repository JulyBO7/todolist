
type ActionType = ChangeAppStatusActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    appStatus: 'idle' as RequestStatusType,
    error: null
}
export const appReducer = (state=initialState, action: ActionType)=> {
    switch(action.type){
        case 'CHANGE-APP-STATUS': 
        return {...state, appStatus: action.status }
        default: return state
    }
}
export const changeAppStatusAC = (status:RequestStatusType)=>({type:'CHANGE-APP-STATUS' as const, status})
export type ChangeAppStatusActionType = ReturnType <typeof changeAppStatusAC>