import { TodoItem } from "./ToDoItem";

export function ToDoList({ todos, toggleTodo, deleteToDo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteToDo={deleteToDo}
          />
        );
      })}
    </ul>
  );
}
