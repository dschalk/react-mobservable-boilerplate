import {makeReactive} from 'mobservable';

var toStore = {
    todos: [
        {
            title: 'Find a clean mug',
            completed: true
        },
        {
            title: 'Make coffee',
            completed: false
        }
    ],
    completedCount: () => {
        return this.todos.filter((todo) => todo.completed).length;
    },
    pending: 0,
    addTodo: (title) => {
      this.todos.push({
        title: title,
        completed: false
      });
    },
    removeTodo: (todo) => {
      this.todos.splice(this.todos.indexOf(todo), 1);
    }
};
let TodoStore = makeReactive(toStore);
export default TodoStore
