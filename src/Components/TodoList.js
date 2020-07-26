import React, { Component } from "react";
import Task from "./Task";

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todo: [
        //{id: 100, task: "Play chess", done: false},
        //{id: 200, task: "Eat salad", done: false}
      ],
      count: 0,
      userInput: "",
      //done: []
    };
  }

  handleInput(event) {
    this.setState({ userInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const todoUpdated = this.state.todo.slice();
    todoUpdated.push({
      id: this.state.count,
      task: this.state.userInput,
      done: false,
      favourite: false,
    });
    this.setState({
      todo: todoUpdated,
      userInput: "",
      count: this.state.count + 1,
    });
  }

  handleDelete(taskID) {
    const todoUpdated = this.state.todo.filter((task) => task.id !== taskID);
    this.setState({ todo: todoUpdated });
  }

  handleReset() {
      const todoUpdated = []
      this.setState({todo: todoUpdated})
  }

  displayReset(){
      if(this.state.todo.length>0){
          return(<button onClick={() => this.handleReset()}>Reset</button>)
      }
  }

  getState() {
    console.log(this.state.todo);
  }

  toggleDone(taskObj) {
    const todoUpdated = this.state.todo.slice();
    const taskIndex = this.state.todo.indexOf(taskObj);
    todoUpdated[taskIndex].done = !taskObj.done;
    this.setState({ todo: todoUpdated });
  }

  toggleFavourite(taskObj) {
    const todoUpdated = this.state.todo.slice();
    const taskIndex = this.state.todo.indexOf(taskObj);
    todoUpdated[taskIndex].favourite = !taskObj.favourite;
    this.setState({ todo: todoUpdated });
  }

  // Sort the lists
  getFavouriteTodo() {
    const displayList = this.state.todo.filter(
      (task) => task.done === false && task.favourite === true
    );
    return displayList;
  }

  getFavouriteDone() {
    const displayList = this.state.todo.filter(
      (task) => task.done === true && task.favourite === true
    );
    return displayList;
  }

  getTodoList() {
    const displayList = this.state.todo.filter(
      (task) => task.done === false && task.favourite === false
    );
    return displayList;
  }

  getListDone() {
    const displayList = this.state.todo.filter((task) => task.done === true && task.favourite === false);
    return displayList;
  }

  render() {
    return (
      <div>
        <p>Number of tasks {this.state.count}</p>
        <button onClick={() => this.getState()}>Get State</button>
        {this.displayReset()}
        
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type="text"
            placeholder="Add new task"
            onChange={(event) => this.handleInput(event)}
            value={this.state.userInput}
          />
          <button>Add</button>
        </form>

        <h1>What you have to do:</h1>
        <ul>
          {this.getFavouriteTodo().map((item) => (
            <Task
              key={item.id}
              taskName={item.task}
              onDelete={() => this.handleDelete(item.id)}
              isItDone={() => this.toggleDone(item)}
              isItFavourite={() => this.toggleFavourite(item)}
            />
          ))}

          {this.getTodoList().map((item) => (
            <Task
              key={item.id}
              taskName={item.task}
              onDelete={() => this.handleDelete(item.id)}
              isItDone={() => this.toggleDone(item)}
              isItFavourite={() => this.toggleFavourite(item)}
            />
          ))}
        </ul>

        <h1>What you have to do:</h1>
        <ul>
          {this.getFavouriteDone().map((item) => (
            <Task
              key={item.id}
              taskName={item.task}
              onDelete={() => this.handleDelete(item.id)}
              isItDone={() => this.toggleDone(item)}
              isItFavourite={() => this.toggleFavourite(item)}
            />
          ))}
          {this.getListDone().map((item) => (
            <Task
              key={item.id}
              taskName={item.task}
              onDelete={() => this.handleDelete(item.id)}
              isItDone={() => this.toggleDone(item)}
              isItFavourite={() => this.toggleFavourite(item)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
