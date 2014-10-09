var Score = function(){
  sessionStorage.setItem('score', 0);
  this.url = '/score';
  this.setPlayer();
};

Score.prototype.setPlayer = function(score){
  var e;
  if (!score) {
    this.playerName = prompt('Player name?');
    while (!this.playerName) {
      this.playerName = prompt('Player name?');
    }
    e = {
      score : score || 0,
      player : this.playerName
    };
    this.method = 'POST';
  } else {
    this.url += '/' + this.playerStats._id;
    this.method = 'PUT';
  }

  this.setXhr(this.method ,this.getScore , 
    JSON.stringify(e || this.playerStats));
  e = 0;
};

Score.prototype.getScore = function(data) {
  this.playerStats = data;
  console.log(this.playerStats);
};

Score.prototype._getJSON = function(callback) {
  if (this.xhr.readyState === 4 && this.xhr.status === 200) {
    this.status = JSON.parse(this.xhr.responseText);
    callback(this.status);
  }
};

Score.prototype.render = function(timelapse){
  this.playerStats.score += timelapse;
  this.setPlayer(parseInt(this.playerStats.score, 10));
};

Score.prototype.setXhr = function(method, callback, data){
  this.xhr = new XMLHttpRequest();
  this.xhr.onload = this._getJSON.bind(this, callback.bind(this));
  this.xhr.open(method, this.url);
  this.xhr.setRequestHeader('Content-Type','application/json');
  this.xhr.send(data || null);
};

Score.prototype.set = function(val){
  sessionStorage.setItem('score', val.toString());
};

module.exports = Score;
