import { ThunkDispatch,thunk} from 'redux-thunk'
import {tasksReducer} from './tasksReducer'
import { todolistsReducer } from './todolistsReducer'
import { AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import { useDispatch } from 'react-redux'
import { appReducer } from './appReducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
//@ts-ignore
window.store = store
