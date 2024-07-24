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
    changeTask: (taskId: string, newIsDoneValue: TaskStatuses) => void
}

export const Task = memo ((props: TaskPropsType) => {
console.log('Task')

    const changeTask = useCallback((value: TaskStatuses) => { 
        props.changeTask (props.taskId, value)
    }, [props.changeTask,props.taskId])

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.taskId,newTitle )
    }, [props.changeTaskTitle, props.taskId])
    const removeTask = useCallback(() => {
        props.removeTask(props.taskId)
    }, [props.removeTask,props.taskId])

    return (
        <div>
            <TaskCheckbox check={props.status === TaskStatuses.Completed ? true : false} changeStatus={changeTask} />

            <EditableSpan   title={props.title}
                            todolistId={props.todolistId}
                            changeTitle={changeTaskTitle}
                            removeItem={removeTask}
            />
        </div>

    )
})

