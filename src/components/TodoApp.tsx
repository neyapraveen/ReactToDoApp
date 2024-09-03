import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { TodoItem } from '../models/TodoItem';
import { loadTodosFromLocalStorage } from '../utils/localStorageUtils';

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoItem[]>(loadTodosFromLocalStorage());
  const [newTodo, setNewTodo] = useState('');

// Update local storage whenever TODOs change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to local storage:', error);
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo.trim(),
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo('');
    }
  };

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Calculate the number of incomplete todos
  const incompleteCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="input-wrapper">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new task"
            id="todo-input"  // Unique id attribute added for accessibility
          />
          <button onClick={addTodo} className="add-task-btn">
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </li>
          ))}
        </ul>
      </main>
      <Footer incompleteCount={incompleteCount} />
    </div>
  );
};

export default TodoApp;
