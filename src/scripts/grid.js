var Timer = require('./event.js');

var doc = document;

var Grid = function(cells){
  this.container = doc.getElementById('container');
  this.gridEl = doc.createElement('div');
  this.gridEl.id = 'grid';
  this.timer = new Timer();
  this.perfectSquare(cells);
};

Grid.prototype.render = function(){

  for (var i = 0; i < this.gridSpec.cells; i++) {
    var cell = doc.createElement('div');
    if (i === this.gridSpec.randomCell) {
      cell.classList.add('random');
      cell.addEventListener('click', this.cellClicked.bind(this), false);
    }
    cell.setAttribute('data-index', i);
    cell.classList.add('cell');
    cell.style.backgroundColor = this.gridSpec.randomColor;
    cell.style.width = cell.style.height = 
    this.gridSpec.size - 2 + 'px';
    // append to the Grid
    this.gridEl.appendChild(cell);
  }
  this.gridEl.style.width = this.gridEl.style.height = 
  this.gridSpec.gridSize + 'px';
  this.container.style.width = this.gridSpec.container.width + 'px';
  this.container.style.height = this.gridSpec.container.height + 'px';
  this.container.appendChild(this.gridEl).classList.add('loaded');
  this.timer.startTime();
};

Grid.prototype.cellClicked = function(e){
  e.preventDefault();
  alert('porco dio hai vinto bene!');
  // socket listener here
};

Grid.prototype.perfectSquare = function(cells){
  var delta = Math.min(window.innerHeight, window.innerWidth);
  var totalCells = Math.pow(cells,2);
  var timerHeightperCell = this.timer.elementHeight / cells;
  var size = (delta / cells) - timerHeightperCell;
  var gridSize = size * cells ;
  this.gridSpec = {
    perRow : cells,
    size : size,
    gridSize : gridSize,
    randomColor : 'hsl(' + Math.floor(Math.random() * 360) + ', 50%, 50%)',
    randomCell : Math.floor(Math.random() * totalCells),
    cells :  totalCells,
    container : {
      width : window.innerWidth,
      height : window.innerHeight
    }
  };

  console.log(this.gridSpec, '\n', (cells * this.gridSpec.gridSize));
  this.render();
};

module.exports = Grid;
