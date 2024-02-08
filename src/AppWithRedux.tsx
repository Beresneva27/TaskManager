import React, { useCallback, useReducer, useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistId2, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { AppRootState } from './state/store';
import {useSelector} from 'react-redux';

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }, [dispatch]);
    
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    }, [dispatch]);
    
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch( changeTaskStatusAC(id, isDone, todolistId));
    }, [dispatch]);
    
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }, [dispatch]);
    
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, value));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(ChangeTodolistTitleAC(id, title))
    }, [dispatch]);

    const removeTodolist = useCallback((id: string) => {
        const action = RemoveTodolistAC(id);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback( (title: string) => {
        const action = AddTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
              todolists.map((tl) => {
               let allTodolistTasks = tasks[tl.id];
               let tasksForTodolist = allTodolistTasks;


                return <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}}>
                  <Todolist 
                    //key={tl.id}
                    id={tl.id}
                    title={tl.title} 
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
              })
            }
        </Grid>
      </Container>
    </div>
  );
}


export default AppWithRedux;
