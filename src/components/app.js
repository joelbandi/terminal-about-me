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
    const { history,prompt } = this.props.Terminal.toJS();

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
              h.startsWith('__prompt__')  ? 
                <p className="font"><span className="font prompt">{prompt} </span>{h.split('__prompt__')[1]}</p> :
                <p className="font">{h}</p>
            );
          })}
          <span className="font prompt">{prompt} </span>
          <input className="font" type="text" onKeyPress={this.handleInput.bind(this)} ref="term"/>
        </div>
      </div>
    );
  }
}

export default App;