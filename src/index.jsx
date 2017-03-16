import React from 'react';
import {render} from 'react-dom';
import other from './other';
import Message from './message';


class App extends React.Component {
  render () {
    var sum = other.add(24, 1234);
    return (
      <div>
        <Message name="flashman"/>
        <p className="greeting"> Hello React {sum} </p>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
