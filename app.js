import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Todoinput from "./components/Todoinput";
import Todolist from "./components/Todolist";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv4(),
      items: [],
      item: "",
      editTodo: false,
    };
  }
  handleChange = (e) => {
    this.setState({ item: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let new_item = {
      id: this.state.id,
      item_title: this.state.item,
    };
    console.log(new_item);
    this.setState({
      items: [...this.state.items, new_item],
      id: uuidv4(),
      item: "",
      editTodo: false,
    });
  };

  deleteTodo = (id) => {
    let filterContent = this.state.items.filter((item) => item.id !== id);
    console.log(filterContent);
    this.setState({ items: filterContent });
  };

  editTodo = (id) => {
    let editContent = this.state.items.filter((item) => item.id !== id);
    let selectedItem = this.state.items.find((item) => item.id === id);
    this.setState({
      items: editContent,
      item: selectedItem.item,
      id: id,
      editTodo: true,
    });
  };
  render() {
    console.log(this.state.items);
    return (
      <div>
        <Fragment>
          <header id="headerBlock">
            <Header />
          </header>
          <main className="container bg-info">
            <Todoinput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editTodo={this.state.editTodo}
            />
            <Todolist
              items={this.state.items}
              handledelete={this.deleteTodo}
              handleEdit={this.editTodo}
            />
          </main>
        </Fragment>
      </div>
    );
  }
}
export default App;
