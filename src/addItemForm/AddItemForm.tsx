import { ChangeEvent, useState } from "react";


type AddItemFormTypeProps = {
    callBack: (titleItem: string)=> void
}

export const AddItemForm = (props: AddItemFormTypeProps) => {
        
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHeandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    };
    const onClickBtnHeandler = () => {
        if (title.trim()){
            props.callBack(title)
            setTitle('')
            
        } else {
            setError('Your text is not valiable!')
        }
        
    }
    const onClickEnterHeandler = (e: any) => {
        e.key === 'Enter' && onClickBtnHeandler()
    }
    const userMessageStartTyping: boolean | JSX.Element = !title.length && <p >Enter your text</p>
    const userMessageLengthTitle: boolean | JSX.Element = title.length > 20 && <p style={{ color: 'red' }}>Your text is too long!</p>
    const isAddTaskBtnDisabled: boolean = title.length > 20 || title.length === 0

    return (
            <div>
                <input value={title}
                    onChange={onChangeInputHeandler}
                    onKeyDown={onClickEnterHeandler} 
                    placeholder="Please, enter your text"/>
                <button onClick={onClickBtnHeandler}
                    disabled={isAddTaskBtnDisabled}> + </button>
                      {userMessageLengthTitle}
                    {userMessageStartTyping}
                    {error && <p> {error}</p>}
            </div>
               
    )
}