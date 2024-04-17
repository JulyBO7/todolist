import { Provider } from 'react-redux';
import { AppRootStateType, store } from '../../state/store';
import { combineReducers, legacy_createStore as createStore} from 'redux';
import { v1 } from 'uuid';
import { tasksReducer } from '../../state/tasksReducer';
import { todolistsReducer } from '../../state/todolistsReducer';




const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    },
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] 
    
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType & undefined );

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

