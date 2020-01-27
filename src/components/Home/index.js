import React from 'react';

const img_base ="http://127.0.0.1:5000/";

function Img(props) {
    if (typeof props.name === 'undefined') {
        return null;
    }
    const img_src = img_base + "static?img=" + props.name;
    return <img src={img_src} />
}

function Button(props) {
    if (typeof props.pair.id === 'undefined') {
        return null;
    }
    return <button name={props.name} onClick={() => submit(props.pair, props.name, props.setState)}> {props.name} </button>
}

function submit(pair, name, setState) {
    const username = localStorage.getItem('username');
    const pair_src = img_base + "labeled-dataset?username=" + username;
    fetch(img_base + "labeled-dataset", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                username: username,
                unlabeled_dataset_id: pair.id,
                label: (name === "Yes"? 1: 0)
            }
        )
    }).then(() => {
        fetch(pair_src)
            .then(resp => resp.json())
            .then(data => {
                if (Array.isArray(data.dataset) && data.dataset.length) {
                    setState({pair: data.dataset[0]});
                } else {
                    setState(INITIAL_STATE);
                }
            });
    });

}

const INITIAL_STATE = {
    pair: {
        id: undefined,
        item_1: undefined,
        item_2: undefined,
    }
};

class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        if (!username) {
            return null;
        }
        const pair_src = img_base + "labeled-dataset?username=" + username;
            fetch(pair_src)
            .then(resp => resp.json())
            .then(data => {
                if (Array.isArray(data.dataset) && data.dataset.length) {
                    this.setState({pair: data.dataset[0]});
                } else {
                    this.setState(INITIAL_STATE);
                }
            });
    }

    render() {
        return (
            <div className="App">
                <Img name={this.state.pair.item_1} />
                <Img name={this.state.pair.item_2} />
                <Button name="Yes" pair={this.state.pair} setState={this.setState}/>
                <Button name="No" pair={this.state.pair} setState={this.setState}/>
            </div>
        );
    }

}

export default HomePage;

