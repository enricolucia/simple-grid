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
