"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),Test=function(){function a(){_classCallCheck(this,a),this.tst="A test from: "}return _createClass(a,[{key:"test",value:function(a){console.log(""+this.tst+a)}}]),a}(),Site=function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:"main",value:function(){(new Test).test("Boilerplate")}}]),a}(),MainScripts=function(){/*
        :: Initialize website/project specific modules
    */
Site.main(),/*
        :: Initialize third party plugins
    */
// SVG <use> polyfill for IE and Edge
"function"==typeof svg4everybody&&svg4everybody()}();