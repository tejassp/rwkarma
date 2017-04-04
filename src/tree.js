import React from 'react';

import './common.css';

// each node has properties
// label: string
// children: [node, ...]
class Tree extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      collapsed: true,
    };

    this.onCollapseToggle = this.onCollapseToggle.bind(this);
    this.onChildNodeClick = this.onChildNodeClick.bind(this);
	  this.onNodeClick = this.onNodeClick.bind(this);
  }

  onCollapseToggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  onNodeClick() {
    this.props.onNodeClick(this.props.root);
  }

  onChildNodeClick(node) {
    this.props.onNodeClick(node);
  }

  render() {
    const depth = this.props.depth || 0;
    const style = {
      marginLeft: depth * 10
    };
    const root = this.props.root;
    const collapsed = this.state.collapsed;

    return (
        <div>
          <div>
						<span className={collapsed ? 'arrow-right' : 'arrow-down'} style={style} onClick={this.onCollapseToggle} />
            <span onClick={this.onNodeClick}> {root.label} </span>
          </div>
          <div>
            {!collapsed &&
              root.children.map((node) => {
                return <Tree key={node.label} root={node} depth={depth+1} onNodeClick={this.onChildNodeClick}/>
              })
            }
          </div>
        </div>
    );
  }
}

export default Tree;
