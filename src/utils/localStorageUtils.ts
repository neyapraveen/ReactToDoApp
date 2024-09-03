import { TodoItem } from '../models/TodoItem';

export const loadTodosFromLocalStorage = (): TodoItem[] => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    try {
      const parsedTodos: TodoItem[] = JSON.parse(storedTodos);
      return parsedTodos;
    } catch (error) {
      console.error('Error parsing stored todos:', error);
      return [];
    }
  }
  return [];
};
