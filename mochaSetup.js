const { JSDOM } = require('jsdom');

const Handlebars = require('handlebars');

const fs = require('fs');

const { window } = new JSDOM('<div class="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.HTMLElement = window.HTMLElement;
global.Comment = window.Comment;
global.Node = window.Node;

require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile('contents');
};

require.extensions['.css'] = function (module, filename) {
  module.exports = {};
};
