import { memo, useCallback, useEffect } from 'react';
import { FilterTaskType } from '../../../../app/App';
import { AddItemForm } from '../../../../common/components';
import './Todolist.css'
import { EditableSpan } from '../../../../common/components';
import { Task } from '../Task/Task';
import { AppRootState } from '../../../../app/store';
import { ItemTaskType } from '../../../../featuries/todolistsList/api/tasksApi';
import { TaskStatuses } from '../../../../common/enums';
import { useSelector } from 'react-redux';
import { useActions } from './../../../../common/hooks/useActions';
import { todolistsActions } from '../..';
import { tasksActions } from '../..';
import { renderFilterButton } from './renderFilterButton';

type Props = {
    todolistId: string
    title: string
    filter: FilterTaskType
}
export const Todolist = memo(({ todolistId, title, filter }: Props) => {
    const tasks = useSelector<AppRootState, ItemTaskType[]>(state => state.tasks[todolistId])
    const { changeFilter, removeTodolist, updateTodolist } = useActions(todolistsActions)
    const { fetchTasks, addTask } = useActions(tasksActions)

    useEffect(() => {
        fetchTasks(todolistId)
    }, [])

    const onRemoveTodolist = useCallback(() => {
        removeTodolist(todolistId)
    }, [])
    const changeTodolistTitle = useCallback((title: string) => {
        updateTodolist({ id:todolistId, title })
    }, [])

    const appendTask = useCallback((title: string) => {
        return addTask({ todolistId, title })
    }, [])
    const setFilter = (filter: FilterTaskType) => {
        changeFilter({ todolistId: todolistId, filter })
    }
    const onChangeFilter = (name: FilterTaskType) => {
        setFilter(name)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter((el: ItemTaskType) => el.status !== TaskStatuses.Completed)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter((el: ItemTaskType) => el.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3><EditableSpan   title={title}
                                todolistId={todolistId}
                                changeTitle={changeTodolistTitle}
                                removeItem={onRemoveTodolist} />
            </h3>
            <div>
                <AddItemForm addItem={appendTask} />
            </div>
            {filteredTasks?.map(task => <Task key={task.id}  taskId={task.id} todolistId={todolistId} status={task.status} title={task.title} />)}
            <div>
                {renderFilterButton(onChangeFilter, filter, 'all', 'All')}
                {renderFilterButton(onChangeFilter, filter, 'completed', 'Completed')}
                {renderFilterButton(onChangeFilter, filter, 'active', 'Active')}
            </div >
        </div >
    )
})