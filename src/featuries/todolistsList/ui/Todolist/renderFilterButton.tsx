import Button from '@mui/material/Button';
import { FilterTaskType } from '../../../../app/App';

export const renderFilterButton = (callback: (title: FilterTaskType)=> void, filter: FilterTaskType, title: FilterTaskType, nameButton: string )=> {
    return (
        <Button onClick={()=> callback(title)} size='small' color='success' variant={filter === title ? 'outlined' : 'text'} title={title}> {nameButton} </Button>
    )
}