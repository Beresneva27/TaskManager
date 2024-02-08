import React, { useReducer, useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  
  let todolistId1 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {id: v1(), title: "What to learn", filter: "all"},
    {id: v1(), title: "What to buy", filter: "all"}
  ]);

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]
  });

  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer( changeTaskStatusAC(id, isDone, todolistId));
    }
  

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId));
    }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToTodolistsReducer(ChangeTodolistFilterAC(todolistId, value));
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatchToTodolistsReducer(ChangeTodolistTitleAC(id, title))
    }
  

  function removeTodolist (id: string) {
    //const action = RemoveTodolistAC(id);
    dispatchToTasksReducer( RemoveTodolistAC(id));
    dispatchToTodolistsReducer( RemoveTodolistAC(id));
  }

  function addTodolist(title: string) {
    //const action = AddTodolistAC(title);
    dispatchToTasksReducer(AddTodolistAC(title));
    dispatchToTodolistsReducer(AddTodolistAC(title));
  }

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

                if (tl.filter === "completed") { 
                  tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                }
                if (tl.filter === "active") { 
                  tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                }

                return <Grid item>
                <Paper style={{padding: "10px"}}>
                  <Todolist 
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist} 
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
              })
            }
        </Grid>
      </Container>
    </div>
  )
}


export default AppWithReducers;
