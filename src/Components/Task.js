import React, { Component } from "react";

class Task extends Component {
  render() {
    return (
      <li>
        {this.props.taskName}
        <button onClick={this.props.onDelete}>Delete</button>
        <button onClick={this.props.isItDone}>Done</button>
        <button onClick={this.props.isItFavourite}>Favourite</button>
        <button>Edit</button>
      </li>
    );
  }
}

export default Task;
