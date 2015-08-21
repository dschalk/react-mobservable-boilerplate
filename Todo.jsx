import React from 'react';
import mobservable from 'mobservable';
var count = 0;
var count2 = 0;
var todoStore = mobservable.makeReactive({
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
    completedCount: function() {
        return this.todos.filter((todo) => todo.completed).length;
    },
    pending: 0
});
 
todoStore.addTodo = function(title) {
    this.todos.push({
        title: title,
        completed: false
    });
};
 
todoStore.removeTodo = function(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
};
 
todoStore.loadTodosAsync = function() {
    this.pending++;
    setTimeout(function() {
        this.addTodo('Asynchronously created todo');
        this.pending--;
    }.bind(this), 2000);
};
 
var TodoList = mobservable.reactiveComponent(React.createClass({
  render: function() {
        count2 += 1;
        console.log('___________________________________TodoList rendered again. No. ' + count2);
        var store = this.props.store;
        return (<div>
            <ul>
                { store.todos.map((todo, idx) =>
                    (<TodoView store={ store } todo={ todo } key={ idx } />)
                ) }
                { store.pending ? (<li>Loading more items...</li>) : null }
            </ul>
            <hr/>
            Completed { store.completedCount } of { store.todos.length } items.<br/>
            <button onClick={ this.onNewTodo }>New Todo</button>
            <button onClick={ this.loadMore }>Load more...</button>
        </div>);
    },
 
    onNewTodo: function() {
        this.props.store.addTodo(prompt('Enter a new todo:', 'Try mobservable at home!'));
    },
 
    loadMore: function() {
        this.props.store.loadTodosAsync();
    }
}));
 
var TodoView = mobservable.reactiveComponent(React.createClass({
  render: function() {
        count += 1;
        console.log('____________________TodoView rendered again. No. ' + count);
        var todo = this.props.todo;
        return (<li>
            <input type='checkbox' checked={ todo.completed } onChange={ this.onToggleCompleted } />
            {todo.title}{' '}
            <a href='#' onClick={ this.onEdit }>[edit]</a>
            <a href='#' onClick={ this.onRemove }>[remove]</a>
        </li>);
    },
 
    onToggleCompleted: function() {
        this.props.todo.completed = !this.props.todo.completed;
    },
 
    onEdit: function(e) {
        e.preventDefault();
        this.props.todo.title = prompt('Todo:', this.props.todo.title);
    },
 
    onRemove: function(e) {
        e.preventDefault();
        this.props.store.removeTodo(this.props.todo);
    }
}));
 
React.render(<TodoList store={todoStore} />, document.getElementById('approot'));
