class Box extends React.Component {
    constructor(props) {
        super(props);
        this.changeColor = this.changeColor.bind(this);
        this.state = {
            color: 0
        }
    }
    changeColor() {
        var colors = this.props.arr;
        if (this.state.color === 0) {
            var newColor = colors[0];
        } else if (this.state.color === colors[colors.length]) {
            var newColor = colors[0];
        } else {
            var newColor = colors[(colors.indexOf(this.state.color) + 1)]
        }

        this.setState({
            color: newColor
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.changeColor}>change Color</button>
                <div className={this.state.color}></div>
                <div className={this.state.color}></div>
            </div>
        );
    }
}

function render() {
    var colors = ["green", "blue", "purple"];
    ReactDOM.render(
        <div>
            <Box
                arr={colors} />
            <Box
                arr={colors} />
        </div>,
        document.getElementById("root")
    );
}

render();




window.Vanilla_App = {
    colors: ["green", "blue", "pink", "purple"],
    color_index: 0
};

Vanilla_App.changeColor = function () {
    Vanilla_App.color_index = (Vanilla_App.color_index + 1) % Vanilla_App.colors.length;
    // change to querySelectorAll + forEach
    document.querySelectorAll(".vanilla .boxes div").forEach(function (box) {
        box.setAttribute("class", Vanilla_App.colors[Vanilla_App.color_index]);
    });

}

function init() {
    document.querySelector("#color_btn").addEventListener("click", Vanilla_App.changeColor);
}

init();