var doc = document;

var Grid = function(cells){
  this.container = doc.getElementById('container');
  this.gridEl = doc.createElement('div');
  this.gridEl.id = 'grid';
  this.perfectSquare(cells);
};

Grid.prototype.render = function(){

  for (var i = 0; i < this.gridSpec.cells; i++) {
    var cell = doc.createElement('div');
    var cellContent = doc.createElement('span');
    cell.appendChild(cellContent);
    if (i === this.gridSpec.randomCell) {
      cell.classList.add('random');
      cell.addEventListener('click', this.cellClicked.bind(this), false);
    }
    cell.setAttribute('data-index', i);
    cell.classList.add('cell');
    cell.style.backgroundColor = this.gridSpec.randomColor;
    cell.style.width = cell.style.height = this.gridSpec.size + 'px';
    console.log(this.gridSpec);
    cellContent.textContent = i;
    // append to the Grid
    this.gridEl.appendChild(cell);
  }

  this.container.appendChild(this.gridEl);
};

Grid.prototype.cellClicked = function(e){
  e.preventDefault();
  alert('porco dio hai vinto bene!');
  // socket listener here
};

Grid.prototype.perfectSquare = function(cells){
  var delta = Math.min(window.innerHeight, window.innerWidth);
  this.gridSpec = {
    perRow : cells,
    size : delta / Math.sqrt(cells),
    gridSize : delta,
    randomColor : 'hsl(' + Math.floor(Math.random() * 256) + ', 50%, 50%)',
    randomCell : Math.floor(Math.random() * cells),
    cells :  Math.pow(this.gridSpec.cells,2)
  };

  console.log(this.gridSpec.randomColor);

  this.render();
};

module.exports = Grid;
