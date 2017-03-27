import React from 'react';

class Message extends React.Component {
  render() {
    var name = this.props.name || ' stranger';
    return (
      <div>
        <h3> Hi { name } </h3>
      </div>
      );
  }
}

export default Message;

