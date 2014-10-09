var doc = document,
    win = window;

var Manager = function(){
  this.modal = doc.querySelector('#modal');
  this.modal.container = this.modal.getElementsByClassName('modal-content')[0];
  this.modal.titleTag = this.modal.getElementsByTagName('h1')[0];
  this.modal.contentTag = this.modal.getElementsByClassName('desc')[0];
  this.modal.submit = this.modal.getElementsByTagName('button')[0];
  this.modal.submit.addEventListener('click', this.stop.bind(this));

  this._boundRetry = this.retry.bind(this);
  this._boundNextLevel = this.nextLevel.bind(this);

  this.ready();
};

Manager.prototype.ready = function(){
  this.modal.classList.remove('hidden');
  // funny transitions here
};

Manager.prototype.stop = function(){
  this.modal.classList.add('hidden');
};

Manager.prototype.handler = function(revealCell, e){
  switch (e.detail) {
    case 'timeout' :
      this.modal.titleTag.textContent = 'Timeout!';
      this.modal.contentTag.textContent = 'You suck soooo bad!';
      this.modal.submit.textContent = 'Retry';
      this.getListener('timeout');
      revealCell();
      break;
    case 'completed' :
      this.modal.titleTag.textContent = 'You got it right!';
      this.modal.contentTag.textContent = 'Ready to rumble again?';
      this.modal.submit.innerHTML = 'Next Level &raquo;';
      this.getListener('completed');
      this.ready();
  }
};

Manager.prototype.getListener = function(type){

  this.modal.submit.removeEventListener('click', this._boundRetry);
  this.modal.submit.removeEventListener('click', this._boundNextLevel);

  if (type === 'timeout') {
    this.modal.submit.addEventListener('click', this._boundRetry);
  } else if (type === 'completed') {
    this.modal.submit.addEventListener('click', this._boundNextLevel);
  }
};

Manager.prototype.nextLevel = function(){
  this.stop();
  var nextLevel = new Event('nextLevel');
  this.modal.dispatchEvent(nextLevel);
};

Manager.prototype.retry = function(){
  this.stop();
  var retry = new Event('retry');
  this.modal.dispatchEvent(retry);
};


module.exports = Manager;
