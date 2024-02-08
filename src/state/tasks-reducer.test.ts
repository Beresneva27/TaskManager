import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import { TasksStateType} from "../App";
import { AddTodolistAC, RemoveTodolistAC } from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType ={
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Axios", isDone: true},
            {id: "2", title: "REST API", isDone: true},
            {id: "3", title: "Webpack", isDone: false},
            {id: "4", title: "yarn", isDone: false}
        ]
    };

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const startState: TasksStateType ={
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Axios", isDone: true},
            {id: "2", title: "REST API", isDone: true},
            {id: "3", title: "Webpack", isDone: false},
            {id: "4", title: "yarn", isDone: false}
        ]
    };

    const action = addTaskAC("nextJS", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("nextJS");
    expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const startState: TasksStateType ={
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Axios", isDone: true},
            {id: "2", title: "REST API", isDone: true},
            {id: "3", title: "Webpack", isDone: false},
            {id: "4", title: "yarn", isDone: false}
        ]
    };

    const action = changeTaskStatusAC("2", false, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBeFalsy();
    expect(endState["todolistId2"][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
    const startState: TasksStateType ={
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Axios", isDone: true},
            {id: "2", title: "REST API", isDone: true},
            {id: "3", title: "Webpack", isDone: false},
            {id: "4", title: "yarn", isDone: false}
        ]
    };

    const action = changeTaskTitleAC("2", "Milkyway", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType ={
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Axios", isDone: true},
            {id: "2", title: "REST API", isDone: true},
            {id: "3", title: "Webpack", isDone: false},
            {id: "4", title: "yarn", isDone: false}
        ]
    };

    const action = AddTodolistAC("new todolist");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key shold be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType ={
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "Axios", isDone: true},
            {id: "2", title: "REST API", isDone: true},
            {id: "3", title: "Webpack", isDone: false},
            {id: "4", title: "yarn", isDone: false}
        ]
    };

    const action = RemoveTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});