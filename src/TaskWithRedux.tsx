import { memo, useCallback } from "react"
import { TaskCheckbox } from "./checkbox/TaskCheckbox"
import { EditableSpan } from "./editableSpan/EditableSpan"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "./state/store"
import { ItemTaskType } from "./AppWithRedux"
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasksReducer"


type TaskPropsType = {
    todolistId: string
    taskId: string

}

export const TaskWithRedux = memo ((props: TaskPropsType) => {
    
    const task = useSelector<AppRootStateType, ItemTaskType>(state=> state.tasks[props.todolistId].find(task => task.id === props.taskId) as ItemTaskType )
    
    const dispatch = useDispatch()


    const changeTaskStatus = useCallback((value: boolean) => { 
        dispatch(changeTaskStatusAC(props.todolistId, props.taskId, value))
    }, [props.todolistId,props.taskId])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.taskId, newTitle))
    }, [props.taskId])

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.todolistId, props.taskId))
    }, [props.todolistId, props.taskId])

    return (
        <div>
            
            <TaskCheckbox check={task?.isDone} changeStatus={changeTaskStatus} />

            <EditableSpan   title={task.title}
                            todolistId={props.todolistId}
                            changeTitle={changeTaskTitle}
                            removeItem={removeTask}
            />
        </div>

    )
})

