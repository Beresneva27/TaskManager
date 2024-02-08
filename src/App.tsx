import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import {v1} from 'uuid';
import { AddItemForm } from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  
  let todolistId1 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: v1(), title: "What to learn", filter: "all"},
    {id: v1(), title: "What to buy", filter: "all"}
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]
  });

  function removeTask(id: string, todolistId: string) {
      let todolistTasks = tasks[todolistId];
      let filteredTasks = todolistTasks.filter(t => t.id !== id );
      tasks[todolistId] = filteredTasks;
      setTasks({...tasks});
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(),  title: title, isDone: false};
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];  
    setTasks({...tasks});
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id ===id);
    if (task) { 
      task.isDone = isDone;
      setTasks({...tasks});
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) { 
      task.title = newTitle;
      setTasks({...tasks});
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id );
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist (todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId )
    setTodolists(filteredTodolist);

    delete tasks[todolistId];
    setTasks({...tasks});
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasks,
      [todolist.id]: []
    })
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


export default App;
