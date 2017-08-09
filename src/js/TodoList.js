import React from "react"
import { observer } from 'mobx-react';

@observer
export default class TodoList extends React.Component {

  filter(e) {
    this.props.store.filter = e.target.value
  }

  createNew(e) {
    //Take KeyCode assembly of keyboard
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value);
      e.target.value = "";
    }
  }

  toggleComplete(todo){
    todo.complete = !todo.complete
  }

  render() {
    const { clearComplete, filter, filteredTodos, todos } = this.props.store;

    const todoList = filteredTodos.map(todo => (
      <li key={todo.id}><input type='checkbox' onChange={() => this.toggleComplete(todo) } checked={todo.complete} />{todo.value}</li>
    ))

    return (
      <div>
        <h2>
          Todos
        </h2>
        <div>{filter}</div>
        <input className="create" onKeyPress={(e) => this.createNew(e)} />
        <input className="filter" value={filter} onChange={(e) => this.filter(e)} />
        <ul>{todoList}</ul>
        <a href="#" onClick={clearComplete}>Clear Complete</a>
      </div>
    );
  }
}