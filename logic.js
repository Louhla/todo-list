class App extends React.Component {
    constructor(props) {
        super(props);
        this.saveInput = this.saveInput.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.createDone = this.createDone.bind(this);
        this.createRedo = this.createRedo.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            todo: [],
            done: []
        }
    }
    saveInput(input) {
        this.textInput = input;
    }
    createTodo() {
        var newState = this.textInput.value;
        this.setState({
            todo: this.state.todo.concat([newState])
        })
        this.textInput.value = "";
    }
    createRedo(redo) {
        var newState = redo;
        this.setState({
            todo: this.state.todo.concat([newState])
        })
        var arr = this.state.done;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === redo) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
    createDone(doneTodo) {
        var newState = doneTodo;
        this.setState({
            done: this.state.done.concat([newState])
        });
        var arr = this.state.todo;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === doneTodo) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
    deleteItem(deletedTodo) {
        var arr = this.state.todo;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === deletedTodo) {
                arr.splice(i, 1);
                i--;
            }
        }
    }

    render() {
        return (
            <div>
                <h1>My Todos</h1>
                <input autofocus="autofocus" ref={this.saveInput} type="text" placeholder="My next todo"></input><button onClick={this.createTodo}>Add</button>
                {/* <select onChange={this.select}>
                    <option ref={this.saveInput} value="high">High</option>
                    <option ref={this.saveInput} value="medium">Medium</option>
                    <option ref={this.saveInput} value="low">Low</option>
                </select> */}
                <Todo handleClick={this.createDone} handleDelete={this.deleteItem} listItem={this.state.todo} />
                <Done handleClick={this.createRedo}  listItemDone={this.state.done} />
            </div>
        );
    }
}


class Done extends React.Component {
    constructor(props) {
        super(props);
        this.setTodo = this.setTodo.bind(this);
        this.state = {
            done: []
        }
    }
    setTodo(e) {
        var redo = e.target.id;
        this.props.handleClick(redo);
    }
    render() {
        var listItemDone = this.props.listItemDone;
        var updatedDone = listItemDone.map((x, i) =>
            <div key={i} className="item"><li onClick={this.setTodo} id={listItemDone[i]} className="doneItem">{listItemDone[i]}</li><span onMouseOver="" className="icon"><i className={"fas fa-times " + this.state.isDelete}></i></span></div>);

        return (
            <div className="list" >
                <h3>Done</h3>
                <ul>
                    {updatedDone}
                </ul>
            </div>
        );
    }
}



class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.setDone = this.setDone.bind(this);
        // this.showDeleteButton = this.showDeleteButton.bind(this);
        this.itemToDelete = this.itemToDelete.bind(this);
        this.state = {
            done: [],
            todo: this.props.listItem,
            isDelete: "notDelete"
        }
    }
    setDone(e) {
        var done = e.target.id
        this.props.handleClick(done);
    }

    // showDeleteButton() {
    //     var newState = "toDelete"
    //     this.setState({
    //         isDelete: newState
    //     })
    // }
    itemToDelete(e){
        var done = e.target.id
        this.props.handleClick(done);
    }
    render() {
        var listItem = this.props.listItem;
        var updatedTodo = listItem.map((x, i) =>
            <div key={i} className="item"><li onClick={this.setDone} id={listItem[i]}>{listItem[i]}</li><span onClick={this.itemToDelete} id={listItem[i]} className={this.state.isDelete}><i className="fas fa-times"></i></span></div>);
        return (
            <div className="list">
                <h3>Todo</h3>
                <ul>
                    {updatedTodo}
                </ul>
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