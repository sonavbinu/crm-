import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "../slice/todoSlice";

const Todo = () => {
  const [text, setText] = useState("");

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-3xl font-bold">Todo List</h2>
      <div className="flex  gap-3">
        <input
          className="border "
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-black text-white px-2 py-1 rounded cursor-pointer hover:bg-gray-700"
          onClick={handleAdd}
        >
          Add Todo
        </button>
      </div>

      <ul className="flex flex-col gap-2  p-10 rounded ">
        {todos.map((todo) => (
          <li
            className="border border-gray-400 flex-1 flex p-2 rounded items-center gap-6 justify-between"
            key={todo.id}
          >
            {todo.text}

            <button
              className="flex  bg-red-500 text-white p-2 cursor-pointer hover:bg-red-400 "
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
