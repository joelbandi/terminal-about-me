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
        {this.props.Terminal.toJS().history.map(h => {
          return (
            <div>{h}</div>
          );
        })}
        $ <input type="text" onKeyPress={this.handleInput.bind(this)} ref="term"/>
      </div>
    );
  }
}

export default App;