import mobservable from 'mobservable';
import React from 'react';

let count = 0;
let count2 = 0;

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
    pending: 0,
    count3: 0
});

todoStore.inc3 = x => {return todoStore.count3 = x}

todoStore.addTodo = (title) => {
    todoStore.todos.push({
        title: title,
        completed: false
    });
};

todoStore.removeTodo = (todo) => {
    todoStore.todos.splice(todoStore.todos.indexOf(todo), 1);
};

todoStore.loadTodosAsync = () => {
    todoStore.pending++;
    setTimeout(function() {
        todoStore.addTodo('Asynchronously created todo');
        todoStore.pending--;
    }, 2000);
};

class SetCount extends React.Component {
  constructor(props) {
    super(props);
  }
  handleEnter (event) {
    let g = event.target.value;
    if ( event.keyCode == 13 && g != '') {
      this.props.change(g);
      event.target.value = '';
    }
  }
  click (event) {
    let g = event.target.value;
    if (g != '') {
      this.props.change(g);
      event.target.value = '';
    }
  }
  render = () => {
    return (
          <input type="text" onKeyDown={this.handleEnter.bind(this)} onClick={this.click.bind(this)}
            style={{paddingTop: 1.1, paddingBottom: 0.9, paddingLeft: 1, paddingRight: 1, color: '#ff0000', 
              fontSize: 22,  backgroundColor: '#d8d17d', marginLeft: 8, width: 25, textAlign: 'center' }} />
    );
  }
};

class ToList extends React.Component{
  constructor(props) {
    super(props);
    this.store = todoStore;
  }
    render = () => {
      count2 += 1;
      console.log('_________________________________________ToDoList rendered ' + count2 + ' times.');
        var store = this.store;
        return (<div>
            <ul>
                { store.todos.map((item, idx) =>
                    (<TodoView store={ store } todo={ item } key={ idx } />)
                ) }
                { store.pending ? (<li>Loading more items...</li>) : null }
            </ul>
            <hr/>
            Completed { store.completedCount } of { store.todos.length } items.<br/>
            <button onClick={ this.onNewTodo }>New Todo</button>
            <button onClick={ this.loadMore }>Load more...</button>
            <br /><br />
        Enter anything then click or press 'Enter': <SetCount change={store.inc3} />
        <h1>{store.count3}</h1>
        </div>);
    }

    onNewTodo = () => {
        this.store.addTodo(prompt('Enter a new todo:', 'Try mobservable at home!'));
    }

    loadMore = () => {
        this.store.loadTodosAsync();
    }
};

class ToView extends React.Component{
    render = () => {
      count += 1;
      console.log('__________________________________ToDoView rendered ' + count + ' times.');
        var todo = this.props.todo;
        return (<li>
            <input type='checkbox' checked={ todo.completed } onChange={ this.onToggleCompleted } />
            {todo.title}{' '}
            <a href='#' onClick={ this.onEdit }>[edit]</a>
            <a href='#' onClick={ this.onRemove }>[remove]</a>
        </li>);
    }

    onToggleCompleted = () => {
        this.props.todo.completed = !this.props.todo.completed;
    }

    onEdit = e => {
        e.preventDefault();
        this.props.todo.title = prompt('Todo:', this.props.todo.title);
    }

    onRemove = e => {
        e.preventDefault();
        this.props.store.removeTodo(this.props.todo);
    }
};
let TodoView = mobservable.reactiveComponent(ToView); 
let TodoList = mobservable.reactiveComponent(ToList);
React.render(<TodoList />, document.getElementById('approot'));
