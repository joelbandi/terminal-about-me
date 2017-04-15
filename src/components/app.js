import React, { Component } from 'react';
import { connectModule } from 'redux-modules'
import module from '../module';
import '../style.scss';

@connectModule(module)
class App extends Component {


  componentWillMount() {
    module.parseCommand('intro');
  }


  handleInput(e) {
    if (e.key === "Enter"){
      module.parseCommand(this.refs.term.value);
      this.refs.term.value = '';
    }
    
  }

  render() {

    const { history } = this.props.Terminal.toJS();

    return (
      <div>
        <div id="head">Joel Bandi</div>
        <div id="bar">
          <div id="red"></div>
          <div id="yellow"></div>
          <div id="green"></div>
        </div>
        <div id="screen">
          {this.props.Terminal.toJS().history.map(h => {
            return (
              <p className="font">{h}</p>
            );
          })}
          <span className="font prompt">user@localhost:~$ </span>
          <input className="font" type="text" onKeyPress={this.handleInput.bind(this)} ref="term"/>
        </div>
      </div>
    );
  }
}

export default App;