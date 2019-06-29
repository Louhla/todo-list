class App extends React.Component {
    constructor(props) {
        super(props);
        this.createTodo = this.createTodo.bind(this);
        this.createRedo = this.createRedo.bind(this);
        this.createDone = this.createDone.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            index: 0,
            todo: [],
            done: []
        }
    }
    createTodo(event) {
        event.preventDefault();
        var newIndex = this.state.index + 1;
        var new_todo = {
            task: this.task.value,
            prio: this.prio.value,
            id: newIndex
        };
        this.state.todo.push(new_todo);
        this.setState({
            todo: this.state.todo,
            index: newIndex
        });
        this.task.value = "";
    }
    createRedo(redo) {
        var new_redo = {
            task: redo.task,
            id: redo.id,
            prio: redo.prio
        };
        this.state.todo.push(new_redo);
        this.setState({
            todo: this.state.todo
        });

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
            task: doneTodo.task,
            id: doneTodo.id,
            prio: doneTodo.prio
        };
        this.state.done.push(new_done);
        this.setState({
            done: this.state.done
        });

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
            if (arr[i] == todelete) {
                arr.splice(i, 1);
                i--;
            }
        }
        this.setState({
            todo: arr
        })
        var arr1 = this.state.done;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] == todelete) {
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
                    <img src="./logo.jpg"/>
                </div>
                <form onSubmit={this.createTodo}>
                    <input id="input-field" spellCheck="false" ref={input => this.task = input} type="text" placeholder="My next todo"></input>
                    <select ref={input => this.prio = input}>
                        <option selected disabled>Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <input id="submit-button" type="submit" value="+" ></input>
                </form>
                <Todo createDone={this.createDone} handleDelete={this.deleteItem} listItem={this.state.todo} />
                <Done createRedo={this.createRedo} handleDelete={this.deleteItem} listItemDone={this.state.done} />
            </div>
        );
    }
}


class Done extends React.Component {
    constructor(props) {
        super(props);
        this.setTodo = this.setTodo.bind(this);
        this.itemToDelete = this.itemToDelete.bind(this);
    }
    setTodo(objectToDo) {
        this.props.createRedo(objectToDo);
    }
    itemToDelete(objectToDelete) {
        this.props.handleDelete(objectToDelete);
    }
    render() {
        var listItemDone = this.props.listItemDone;
        var updatedDone = listItemDone.map((x, i) =>
            <div key={i} className="item"><div onClick={() => this.setTodo(listItemDone[i])} className="doneItem">{listItemDone[i].task}</div>
                <span className="x" onClick={() => this.itemToDelete(listItemDone[i])}><i className="fas fa-times"></i></span></div>);

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
        this.todoItem = this.todoItem.bind(this);
        this.setDone = this.setDone.bind(this);
        this.itemToDelete = this.itemToDelete.bind(this);
    }
    todoItem(item) {
        this.todoItem = item;
    }
    setDone(objectToDone) {
        this.props.createDone(objectToDone);
    }
    itemToDelete(objectToDelete) {
        this.props.handleDelete(objectToDelete); 
    }
    render() {
        var listItem = this.props.listItem;
        var updatedTodo = listItem.map((x, i) =>
            <div key={i} className={`item ${listItem[i].prio}`}><div onClick={() => this.setDone(listItem[i])} className="todoItem">{listItem[i].task}</div>
                <span onClick={() => this.itemToDelete(listItem[i])} className="x"><i className="fas fa-times"></i></span></div>);
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