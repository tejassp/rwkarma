import React from 'react';
import { render } from 'react-dom';
import other from './other';
import Message from './message';
import Tree from './tree';
import InteractiveChart from './interactivechart';


var tree = {
  label: 'India',
  children: [{
    label: 'Karnataka',
    children: [{
      label: 'Shivamogga',
      children: []
    }, {
      label: 'Chikmagalur',
      children: []
    }]
  }, {
    label: 'Punjab',
    children: []
  }]
};

var onNodeClick = function(node) {
  alert(`${node.label} clicked`);
};

class App extends React.Component {
  render() {
    var sum = other.add(24, 1234);
    return (
      <div>
        <Tree root={tree} onNodeClick={onNodeClick}/>
        <Message name="flashman" />
        <p className="greeting"> Hello React
          { sum } </p>
        <InteractiveChart />
      </div>
      );
  }
}

render(<App/>, document.getElementById('app'));
