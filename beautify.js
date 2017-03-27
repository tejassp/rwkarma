const esformatter = require('esformatter');
const fs          = require('fs');
const path        = require('path');
const walk        = require('fs-walk');

function main() {
  const options = getOptions();
  // walk the src directory
  walk.walkSync(__dirname + '/src', function(basedir, filename) {
    if (shouldFormat(filename)) {
      let file      = path.join(basedir, filename);
      let contents  = fs.readFileSync(file).toString();
      let formatted = esformatter.format(contents, options);

      fs.writeFileSync(file, formatted);
    }
  });
}

function shouldFormat(filename) {
  var f = filename;
  return f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.jsx');
}

function getOptions() {
  // esformatter options
  // see https://github.com/royriojas/esformatter-jsx#config
  return {
    "plugins": [
      "esformatter-jsx"
    ],
    // this is the section this plugin will use to store the settings for the jsx formatting
    "jsx": {
      // whether to recursively format jsx expressions with esformatter
      // set this to false if you don't want JSXExpressions to be formatted recursively, like when using problematic plugins
      "formatJSXExpressions": true,
      // By default ObjectExpression and ArrayExpression in JSXExpressions are inlined,
      // if false, the Expression might expand several lines
      "JSXExpressionsSingleLine": true,
      // by default is true if set to false it works the same as esformatter-jsx-ignore
      "formatJSX": true,
      // keep the node attributes on the same line as the open tag. Default is true.
      // Setting this to false will put each one of the attributes on a single line
      "attrsOnSameLineAsTag": true,
      // how many attributes should the node have before having to put each
      // attribute in a new line. Default 1
      "maxAttrsOnTag": 1,
      // if the attributes are going to be put each one on its own line, then keep the first
      // on the same line as the open tag
      "firstAttributeOnSameLine": false,
      // default to one space. Make it empty if you don't like spaces between JSXExpressionContainers
      "spaceInJSXExpressionContainers": " ",
      // align the attributes with the first attribute (if the first attribute was kept on the same line as on the open tag)
      "alignWithFirstAttribute": true,
      "htmlOptions": { // same as the ones passed to js-beautifier.html
        "brace_style": "collapse",
        "indent_char": " ",
        "indent_size": 2,
        "max_preserve_newlines": 2,
        "preserve_newlines": true
          //wrap_line_length: 250
      }
    }
  };
}

if (require.main === module) {
  main();
}