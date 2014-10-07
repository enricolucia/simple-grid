(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// start everything
var Event = require('./event.js');
var Cell = require('./cell.js');
var Grid = require('./grid.js');

window.onload =
function(){
 console.log('all started slasli');
 var grid = new Grid(12);
};

},{"./cell.js":2,"./event.js":3,"./grid.js":4}],2:[function(require,module,exports){
module.exports = function(){
  console.log('cell module loaded');
};

},{}],3:[function(require,module,exports){
module.exports = function(){
  console.log('event module loaded');
};

},{}],4:[function(require,module,exports){
var Grid = function(cells){
  var container = document.getElementById('container');
  var gridEl = document.createElement('div');
  gridEl.id = 'grid';
  for (var i = 0; i < cells; i++) {
    var cell = document.createElement('div');
    cell.textContent = i;
    gridEl.appendChild(cell);
  }
  container.appendChild(gridEl);
};

module.exports = Grid;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL3NyYy9zY3JpcHRzL2FwcC5qcyIsIi9Vc2Vycy9lbnJpY28vRGVza3RvcC9EZXZlbG9wcy9ncmlkL3NyYy9zY3JpcHRzL2NlbGwuanMiLCIvVXNlcnMvZW5yaWNvL0Rlc2t0b3AvRGV2ZWxvcHMvZ3JpZC9zcmMvc2NyaXB0cy9ldmVudC5qcyIsIi9Vc2Vycy9lbnJpY28vRGVza3RvcC9EZXZlbG9wcy9ncmlkL3NyYy9zY3JpcHRzL2dyaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gc3RhcnQgZXZlcnl0aGluZ1xudmFyIEV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudC5qcycpO1xudmFyIENlbGwgPSByZXF1aXJlKCcuL2NlbGwuanMnKTtcbnZhciBHcmlkID0gcmVxdWlyZSgnLi9ncmlkLmpzJyk7XG5cbndpbmRvdy5vbmxvYWQgPVxuZnVuY3Rpb24oKXtcbiBjb25zb2xlLmxvZygnYWxsIHN0YXJ0ZWQgc2xhc2xpJyk7XG4gdmFyIGdyaWQgPSBuZXcgR3JpZCgxMik7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLmxvZygnY2VsbCBtb2R1bGUgbG9hZGVkJyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLmxvZygnZXZlbnQgbW9kdWxlIGxvYWRlZCcpO1xufTtcbiIsInZhciBHcmlkID0gZnVuY3Rpb24oY2VsbHMpe1xuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuICB2YXIgZ3JpZEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGdyaWRFbC5pZCA9ICdncmlkJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsczsgaSsrKSB7XG4gICAgdmFyIGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjZWxsLnRleHRDb250ZW50ID0gaTtcbiAgICBncmlkRWwuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gIH1cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWRFbCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWQ7XG4iXX0=
