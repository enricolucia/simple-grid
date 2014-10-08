var Score = function(){
  sessionStorage.setItem('score', 0);
};

Score.prototype.render = function(timelapse){
  var oldScore = parseInt(this.get(),10);
  this.set(oldScore + timelapse);
  console.log(this.get());
};

Score.prototype.get = function(){
  return sessionStorage.getItem('score');
};

Score.prototype.set = function(val){
  sessionStorage.setItem('score', val.toString());
};

module.exports = Score;
