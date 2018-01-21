import React, { Component } from 'react';
import logo from './logo.svg';
import steem from 'steem'
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            postingKey: '',
            article: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        console.log("steem", steem)

        steem.api.setOptions({ url: 'https://api.steemit.com'});

        steem.api.getFollowing('sundaybaking', '', null, 100, function(err, result) {
            console.log(err, result);
        });

    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });

    }

    test(val) {
        return val
    }

    handleSubmit(event) {

        console.log(this.state)

        event.preventDefault();

        steem.broadcast.comment(
             
            this.props.postingKey,
            '', // blank,
            'vicetest',
            this.state.username,
            'hello-world-test',
            this.state.title,
            this.state.article,
            { tags: 'test', 'hello': 'world' },

            function(err, result) {
                if(err) {
                    console.log("err", err)
                } else {
                    console.log("Success!", result)
                }
            } 
        );

    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Vice Test</h1>
        </header>
        <div className="App-intro">
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.title}/>
                </div>
                <div>
                    <input type="text" name="postingKey" id="postingKey" onChange={this.handleChange} value={this.state.postingKey}/>
                </div>
                <div><textarea onChange={this.handleChange} id="article" name="article" value={this.state.article}></textarea></div>
                <button>Submit</button>
            </form>
        </div>
      </div>
    );
  }
}

export default App;
