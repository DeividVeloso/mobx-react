import { computed, observable } from "mobx"

class Todo {
  @observable value
  @observable id
  @observable complete

  constructor(value){
    this.value = value
    this.id = Date.now()
    this.complete = false
  }

}


class TodoStore {
  @observable todos = [];
  @observable filter = "";
  @computed get filteredTodos(){
    var matchesFilter = new RegExp(this.filter, 'i');
    return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  }
  createTodo(value){
    this.todos.push(new Todo(value));
  }
  clearComplete = () =>{
    const incompleteTodos = this.todos.filter(todo => !todo.complete)
    this.todos.replace(incompleteTodos)
  }
}

// var store = window.store = new TodoStore; //Use to manipulate data in console Browser
export default new TodoStore;

// //Use to debbugging, putting autorun in import {autorun, obser}
// autorun(() => {
//   console.log(store.filter)
//   console.log(store.todos[0])
// })