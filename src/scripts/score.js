var Score = function(){
  sessionStorage.setItem('score', 0);
  this.url = '/score';
  this.setPlayer();
};

Score.prototype.setPlayer = function(score){
  if (!score){
    this.playerName = prompt('Ma ghi sei?');
  }
  var e = {
    score : score || 0,
    player : this.playerName
  };
  this.setXhr('POST',this.getScore , JSON.stringify(e));
};

Score.prototype.getScore = function(data) {
  console.log(data.score);
};

Score.prototype._getJSON = function(callback) {
  if (this.xhr.readyState === 4 && this.xhr.status === 200) {
    this.status = JSON.parse(this.xhr.responseText);
    callback(this.status);
  }
};

Score.prototype.render = function(timelapse){
  var oldScore = parseInt(this.get(),10);
  this.setPlayer(oldScore + timelapse);
};

Score.prototype.setXhr = function(method, callback, data){
  this.xhr = new XMLHttpRequest();
  this.xhr.onload = this._getJSON(callback.bind(this));
  this.xhr.open(method, this.url);
  this.xhr.setRequestHeader('Content-Type','application/json');
  this.xhr.send(data || null);
};

Score.prototype.set = function(val){
  sessionStorage.setItem('score', val.toString());
};

module.exports = Score;
