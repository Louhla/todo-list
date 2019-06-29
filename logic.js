class App extends React.Component {
    constructor(props) {
        super(props);
        // this.saveInput = this.saveInput.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.createDone = this.createDone.bind(this);
        this.createRedo = this.createRedo.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            index: 0,
            todo: [],
            done: []
        }
    }
    // saveInput(input) {
    //     this.textInput = input;
    // }
    createTodo(event) {
        event.preventDefault();
        var newIndex = this.state.index + 1;
        var new_todo = {
            task: this.task.value,
            // prio: this.prio.value,
            id: newIndex
        };
        this.state.todo.push(new_todo);
        this.setState({ todo: this.state.todo, index: newIndex });
        this.task.value = "";
    }
    createRedo(redo) {
        var new_redo = {
            task: redo.innerHTML,
            id: redo.id
        };
        this.state.todo.push(new_redo);
        this.setState({ todo: this.state.todo });

        var arr = this.state.done;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == redo.id) {
                arr.splice(i, 1);
                i--;
            }
        }
        this.setState({
            done: arr
        })
    }
    createDone(doneTodo) {
        var new_done = {
            task: doneTodo.innerHTML,
            id: doneTodo.id
        };
        this.state.done.push(new_done);
        this.setState({ done: this.state.done });

        var arr = this.state.todo;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == doneTodo.id) {
                arr.splice(i, 1);
                i--;
            }
        }
        this.setState({
            todo: arr
        })
    }
    deleteItem(deletedTodo) {
        var todelete = deletedTodo
        var arr = this.state.todo;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == todelete) {
                arr.splice(i, 1);
                i--;
            }
        }
        this.setState({
            todo: arr
        })
        var arr1 = this.state.done;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].id == todelete) {
                arr1.splice(i, 1);
                i--;
            }
        }
        this.setState({
            done: arr1
        })
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>My Todos</h1>
                </div>
                {/* <input autofocus="autofocus" ref={this.saveInput} type="text" placeholder="My next todo"></input><button onClick={this.createTodo}>Add</button>
                
                 */}
                <form onSubmit={this.createTodo}>
                    <input id="input-field" spellCheck="false" ref={input => this.task = input} type="text" placeholder="My next todo"></input>
                    {/* <input id="prio-field" spellCheck="false" ref={x => this.prio = x} type="text" placeholder="Priority"></input> */}
                    {/* <select ref={this.saveInput1}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select> */}
                    <input id="submit-button" type="submit" value="+" ></input>
                </form>
                <Todo handleClick={this.createDone} handleDelete={this.deleteItem} listItem={this.state.todo} />
                <Done handleClick={this.createRedo} handleDelete={this.deleteItem} listItemDone={this.state.done} />
            </div>
        );
    }
}


class Done extends React.Component {
    constructor(props) {
        super(props);
        this.setTodo = this.setTodo.bind(this);
        this.itemToDelete = this.itemToDelete.bind(this);
        this.todoItem = this.todoItem.bind(this);
        this.state = {
            done: []
        }
    }
    todoItem(item) {
        this.todoItem = item;
    }
    setTodo(e) {
        this.props.handleClick(e.target);
    }
    itemToDelete(e) {
        this.props.handleDelete(e.target.id);
    }
    render() {
        var listItemDone = this.props.listItemDone;
        var updatedDone = listItemDone.map((x, i) =>
            <div key={i} className="item"><div onClick={this.setTodo} id={listItemDone[i].id} className="doneItem">{listItemDone[i].task}</div>
                <span className="x" onClick={this.itemToDelete}><i id={listItemDone[i].id} className="fas fa-times"></i></span></div>);

        return (
            <div className="list" >
                <h3>Done</h3>

                {updatedDone}

            </div>
        );
    }
}



class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.setDone = this.setDone.bind(this);
        this.itemToDelete = this.itemToDelete.bind(this);
        this.todoItem = this.todoItem.bind(this);
        this.state = {
            done: [],
            todo: []
        }
    }
    todoItem(item) {
        this.todoItem = item;
    }
    setDone(e) {
        this.props.handleClick(e.target);
    }

    // createTodo() { a change
    //     var newState = this.textInput.value;
    //     this.setState({
    //         todo: this.state.todo.concat([newState])
    //     })
    //     this.textInput.value = "";
    // }
    itemToDelete(e) {
        debugger;
        this.props.handleDelete(e.target.id);
    }
    render() {
        var listItem = this.props.listItem;
        var updatedTodo = listItem.map((x, i) =>
            <div key={i} className="item"><div onClick={this.setDone} id={listItem[i].id} className="todoItem">{listItem[i].task}</div>
                <span className="icon" onClick={this.itemToDelete} className="x"><i id={listItem[i].id} className="fas fa-times"></i></span></div>);
        return (
            <div className="list">
                <h3>Todo</h3>

                {updatedTodo}

            </div>
        );
    }
}


function render() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}

render();