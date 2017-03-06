describe('Start page', function() {
  browser.get('/');

  it('should render greeting text', function() {
    var message = element(by.css('.greeting')).getText();
    expect(message).toEqual('Hello  React 1258');
  });
});
