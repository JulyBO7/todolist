import { memo, useCallback } from "react"
import { Checkbox } from "./checkbox/Checkbox"
import { EditableSpan } from "./editableSpan/EditableSpan"


type TaskPropsType = {
    todolistId: string
    taskId: string
    isDone: boolean
    title: string
    changeTaskTitle: (taskId: string, newTitle: string)=> void
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
}

export const Task = memo ((props: TaskPropsType) => {

    const changeTaskStatus = useCallback((value: boolean) => { 
        props.changeTaskStatus (props.todolistId, props.taskId, value)
    }, [props.changeTaskStatus,props.todolistId,props.taskId])

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.taskId,newTitle )
    }, [props.changeTaskTitle, props.taskId])
    const removeTask = useCallback(() => {
        props.removeTask(props.todolistId, props.taskId)
    }, [props.removeTask,props.todolistId, props.taskId])

    return (
        <div>
            <Checkbox check={props.isDone} changeStatus={changeTaskStatus} />

            <EditableSpan   title={props.title}
                            todolistId={props.todolistId}
                            changeTitle={changeTaskTitle}
                            removeItem={removeTask}
            />
        </div>

    )
})

