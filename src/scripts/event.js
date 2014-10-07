var doc = document;
var Timer = function(){
	this.timerEl = doc.getElementById('timer');
	this.elementHeight = this.timerEl.getBoundingClientRect().height;
};

Timer.prototype.startTime = function(){
	this.now = new Date().getTime();
	this.end = this.now + 60;
	this.interval = setInterval(this.countDown.bind(this), 1000);
};

Timer.prototype.countDown = function(){
	if (this.now < this.end) {
	this.timelapse = this.end - ++this.now;
	this.timerEl.textContent =  this.timelapse;
	} else {
		clearInterval(this.interval);
	}
};

module.exports = Timer;