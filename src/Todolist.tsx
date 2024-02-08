import React, { ChangeEvent, useCallback, KeyboardEvent, useState } from 'react';
import { FilterValuesType, TasksStateType } from './App';
import { title } from 'process';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import {Checkbox} from '@material-ui/core';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { AppRootState } from './state/store';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { Task } from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone:boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function(props: PropsType) {
    const tasks = useSelector<AppRootState, Array<TaskType>>( state => state.tasks[props.id])
    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.id,  props.changeTodolistTitle]);

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

   
    let tasksForTodolist = props.tasks;

    if (props.filter === "completed") { 
      tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }
    if (props.filter === "active") { 
      tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }

    return <div>
      <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton  onClick={removeTodolist} >
            <Delete />
        </IconButton>
      </h3> 
        <AddItemForm addItem={addTask}/>
        
      <div>
        {
            props.tasks.map(t => <Task 
                task={t}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
                removeTask={props.removeTask}
                todolistId={props.id}
                key={t.id}
            />)
        }
      </div>
      <div>
        <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
        <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}  onClick={onActiveClickHandler}>Active</Button>
        <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"}  onClick={onCompletedClickHandler}>Completed</Button>
      </div>
    </div>
});



export default Todolist;
