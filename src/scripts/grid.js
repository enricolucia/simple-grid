var Timer = require('./timer.js');
var Manager = require('./manager.js');
var Score = require('./score.js');


var doc = document,
    win = window;

var Grid = function(cells) {
  this.container = doc.getElementById('container');
  this.gridEl = doc.createElement('div');
  this.gridEl.id = 'grid';
  this.manager = new Manager();
  this.timer = new Timer(90000);
  this.manager.stop();
  this.score = new Score();
  this._boundCellClicked = this.cellClicked.bind(this);
  this.perfectSquare(cells);

// Listener
  this.timer.timerEl.addEventListener('status',
    this.manager.handler.bind(this.manager, this.revealCell.bind(this)));

  this.manager.modal.addEventListener('nextLevel',
    this.nextLevel.bind(this));

  this.manager.modal.addEventListener('retry',
    this.retry.bind(this));
};

Grid.prototype.nextLevel = function(){
  clearInterval(this.timer.interval);
  this.score.render(this.timer.timelapse);
  this.gridEl.innerHTML = '';
  this.gridSpec.perRow++;
  this.perfectSquare(this.gridSpec.perRow);
};

Grid.prototype.revealCell = function(){
  this.cellRandom.classList.add('revealed');
  setTimeout(function(){
    this.manager.ready();
  }.bind(this), 1000);
};

Grid.prototype.retry = function(){
  clearInterval(this.timer.interval);
  this.cellRandom.classList.add('revealed');
  this.gridEl.innerHTML = '';
  this.perfectSquare(this.gridSpec.perRow);
};

Grid.prototype.render = function(){
  for (var i = 0; i < this.gridSpec.cells; i++) {
    var cell = doc.createElement('div');
    if (i === this.gridSpec.randomCell) {
      this.cellRandom = cell;
      cell.classList.add('random');
      cell.addEventListener('click', this._boundCellClicked);
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
  this.timer.timerEl.dispatchEvent(this.timer.events.completed);
  clearInterval(this.timer.interval);
};

Grid.prototype.perfectSquare = function(cells){
  var delta = Math.min(win.innerHeight, win.innerWidth);
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
      width : win.innerWidth,
    }
  };
  this.render();
};

module.exports = Grid;
