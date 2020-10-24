import template from './template.js';


const startUp = function() {
  template.bindEventListeners();
  template.render();
}

$(startUp);