import { memo, useCallback } from "react"
import { TaskCheckbox } from "./checkbox/TaskCheckbox"
import { EditableSpan } from "./editableSpan/EditableSpan"
import { TaskStatuses } from "./api/todolistApi"

type TaskPropsType = {
    todolistId: string
    taskId: string
    status: TaskStatuses
    title: string
    changeTaskTitle: (taskId: string, newTitle: string)=> void
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: TaskStatuses) => void
}

export const Task = memo ((props: TaskPropsType) => {
console.log('Task')

    const changeTaskStatus = useCallback((value: TaskStatuses) => { 
        props.changeTaskStatus (props.taskId, value)
    }, [props.changeTaskStatus,props.taskId])

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.taskId,newTitle )
    }, [props.changeTaskTitle, props.taskId])
    const removeTask = useCallback(() => {
        props.removeTask(props.taskId)
    }, [props.removeTask,props.taskId])

    return (
        <div>
            <TaskCheckbox check={props.status === TaskStatuses.Completed ? true : false} changeStatus={changeTaskStatus} />

            <EditableSpan   title={props.title}
                            todolistId={props.todolistId}
                            changeTitle={changeTaskTitle}
                            removeItem={removeTask}
            />
        </div>

    )
})

