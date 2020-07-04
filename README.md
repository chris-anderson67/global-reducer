# global-reducer
Small React library to quickly create and use global stores using context and hooks.

## Install
```
npm install -s global-reducer
```

## Usage
Use case: create a global store which is a map of `ToDo`s by ID.
1. Declare state, actions, reducer. 
```
export type ToDo = {id: string, text: string, done: boolean};

export type ToDoAction =
  | {type: "create", text: string}
  | {type: "do", todo: ToDo}
  | {type: "delete", todo: ToDo};


export const ToDoReducer: GlobalReducerFn<ToDo, ToDoAction> = (state, action) => {
  switch (action.type) {
    case "delete":
      const { [action.todo.id]: deleted, ...remaining } = state;
      return remaining;
    ...
  }
}
```

2. Declare an associated context using `createGlobalReducerContext`
```
export const ToDoContext = createGlobalReducerContext(ToDoReducer);
```
3. Use all reducers, then provide all global contexts to the application using `GlobalReducerContextProvider`
```
export const ToDoApp = () => {
  const [toDoState, dispatchToDoAction] = useReducer(ToDoReducer, {});
  const [userState, dispatchUserAction] = useReducer(UserReducer, {});
  return (
    <GlobalReducerContextProvider 
      contexts={[
        {context: ToDoContext, state: toDoState, dispatch: dispatchToDoAction},
        {context: UserContext, state: userState, dispatch: dispatchUserAction}
      ]}
    >
      <ToDoList />
    </GlobalReducerContextProvider>
  );
}
```
4. Use a global store anywhere in the application with hook: `useGlobalReducerContext`
```
export const ToDoList = () => {
  const [todos, dispatch] = useGlobalReducerContext(ToDoContext);
  return todos.map((todo) => 
    <div>
      <ToDoListItem todo={todo}>
      <button onClick={() => dispatch({type: "do", todo})}>Complete</button>
    </div>
  );
}
```
