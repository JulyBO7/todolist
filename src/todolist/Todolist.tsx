import { useState } from "react"
import { FilterTaskType, ItemTaskType, TaskType } from "../App"

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType
    changeFilter: (todolistId: string, newFilterValue: FilterTaskType) => void
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, newTask: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const tasksList: JSX.Element = props.tasks.length
        ? <ul>
            {props.tasks.map(el => {

                return <li>
                    <input type="checkbox" checked={el.isDone} onChange={(e) => props.changeTaskStatus(props.todolistId, el.id, e.currentTarget.checked)} />
                    <span>{el.title}</span>
                    <button onClick={() => { props.removeTask(props.todolistId, el.id) }}> x </button>
                </li>
            })}
        </ul>
        : 
        <span> Your task list is empty </span>
        
    const [title, setTitle] = useState<string>('')

    const onChangeInputHeandler = (e: any) => {
        setTitle(e.currentTarget.value)
    };
    const onClickBtnHeandler = () => {
        props.addTask(props.todolistId,title)
        setTitle('')
    }
    const onClickEnterHeandler = (e: any) => {
        e.key === 'Enter' && onClickBtnHeandler()
    }
    const userMessageStartTyping: boolean | JSX.Element = !title.length && <p >Enter your text</p>
    const userMessageLengthTitle: boolean | JSX.Element = title.length > 15 && <p style={{ color: 'red' }}>Your text is too long!</p>
    const isAddTaskBtnDisabled: boolean = title.length > 15 || title.length === 0

    return (
        <div>
            <h3> {props.title}</h3>
            <div>
                <input value={title}
                    onChange={onChangeInputHeandler}
                    onKeyDown={onClickEnterHeandler} 
                    placeholder="Please, enter your text"/>
                <button onClick={onClickBtnHeandler}
                    disabled={isAddTaskBtnDisabled}> + </button>

                {userMessageLengthTitle}
                {userMessageStartTyping}
            </div>
                {tasksList}
            <div>
                <button onClick={() => props.changeFilter(props.todolistId, 'all')}>All</button>
                <button onClick={() => props.changeFilter(props.todolistId, 'active')}>Active</button>
                <button onClick={() => props.changeFilter(props.todolistId, 'completed')}>Completed</button>
            </div>
        </div>
    )
}