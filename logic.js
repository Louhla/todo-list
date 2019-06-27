class App extends React.Component {
    constructor(props) {
        super(props);
        this.saveInput = this.saveInput.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.createDone = this.createDone.bind(this);
        this.createRedo = this.createRedo.bind(this);
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

    render() {
        return (
            <div>
                <input ref={this.saveInput} type="text" placeholder="My next todo"></input><button onClick={this.createTodo}>add</button>
                <Todo handleClick={this.createDone} listItem={this.state.todo} />
                <Done handleClick={this.createRedo} listItemDone={this.state.done} />
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
        var updatedDone = [];
        for (var i = 0; i < listItemDone.length; i++) {
            updatedDone.push(<li key={i} onClick={this.setTodo} id={listItemDone[i]} className="doneItem">{listItemDone[i]}</li>)
        }
        return (
            <div>
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
        this.state = {
            done: [],
            todo: this.props.listItem
        }
    }
    setDone(e) {
        var done = e.target.id
        this.props.handleClick(done);
    }
    render() {
        var listItem = this.props.listItem;
        var updatedTodo = [];
        for (var i = 0; i < listItem.length; i++) {
            updatedTodo.push(<li key={i} onClick={this.setDone} id={listItem[i]}>{listItem[i]}</li>)
        }
        return (
            <div>
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