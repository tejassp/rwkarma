import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Message from 'src/message';

const renderer = ReactTestUtils.createRenderer();

describe('Message rendering', function() {
  it('should display default name', function() {
    var result;
    var name = ' stranger';
    renderer.render(React.createElement(Message));
    result = renderer.getRenderOutput();

    expect(result.type).toBe('div');
    expect(result.props.children).toEqual([
      <h3> Hi {name} </h3>
    ]);
  });

  it('should display passed in name', function() {
    var result;
    var name = 'flashman';
    renderer.render(React.createElement(Message));
    result = renderer.getRenderOutput();

    expect(result.props.children).toEqual([
      <h3> Hi {name} </h3>
    ]);
  });
});




