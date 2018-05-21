'use strict'

function createHtml(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
}
