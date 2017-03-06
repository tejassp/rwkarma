import other from '../../src/other';

describe('testing other', function() {
  it('should add two numbers', function() {
    var a = 4, b = 2232;
    var sum = other.add(a, b);
    expect(a+b).toBe(sum);
  });

  it('should subtract two numbers', function() {
    var a = 4, b = 2232;
    var diff = other.subtract(a, b);
    expect(a-b).toBe(diff);
  });
});

