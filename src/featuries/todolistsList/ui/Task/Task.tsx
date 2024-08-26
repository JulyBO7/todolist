import { ChangeEvent, memo, useCallback } from 'react';
import { EditableSpan } from '../../../../common/components';
import { TaskStatuses } from '../../../../common/enums';
import { tasksActions } from '../..';
import { useActions } from '../../../../common/hooks';
import Checkbox from '@mui/material/Checkbox';
import { ItemTaskType } from '../../api/tasksApi';

type Props = {
    taskId: string
    todolistId: string
    status: TaskStatuses
    title: string
}
export const Task = memo((props: Props) => {
    
    const { removeTask, changeTask } = useActions(tasksActions)

    const onChangeTaskTitle = useCallback((title: string) => {
        changeTask({ todolistId: props.todolistId, taskId: props.taskId, domainModel: { title} })
    }, [props.taskId])

    const onRemoveTask = useCallback(() => {
        removeTask({ todolistId: props.todolistId, taskId: props.taskId })
    }, [props.taskId])

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        changeTask({ todolistId: props.todolistId, taskId: props.taskId, domainModel: { status } })
    }, [])

    return (
        <div>
            <Checkbox   checked={props.status === TaskStatuses.Completed ? true : false}
                        onChange={onChangeTaskStatus}
                        color='default' />
            <EditableSpan   title={props.title}
                            todolistId={props.todolistId}
                            changeTitle={onChangeTaskTitle}
                            removeItem={onRemoveTask}
            />
        </div>
    )
})

