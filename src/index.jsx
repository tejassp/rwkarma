import React from 'react';
import {render} from 'react-dom';
import other from './other';


class App extends React.Component {
  render () {
    var sum = other.add(24, 1234);
    return <p className="greeting"> Hello React {sum} </p>;
  }
}

render(<App/>, document.getElementById('app'));
