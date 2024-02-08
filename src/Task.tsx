import React, { ChangeEvent, useCallback, KeyboardEvent, useState } from 'react';
import { EditableSpan } from './EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Checkbox} from '@material-ui/core';
import { TaskType } from './Todolist';

type taskPropsType = {
    changeTaskStatus: (id: string, isDone:boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: taskPropsType) => {
    const onRemoveHandler = () =>  props.removeTask(props.task.id, props.todolistId); 
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.changeTaskTitle, props.todolistId]);
                
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""} >
        <Checkbox onChange={onChangeHandler} checked={props.task.isDone} />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton  onClick={onRemoveHandler} >
            <Delete />
        </IconButton>
    </div> 
});
