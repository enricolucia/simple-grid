var doc = document;

var Timer = function(time){
	this.timerEl = doc.getElementById('timer');
	this.limit = time || 30;
	this.elementHeight = this.timerEl.getBoundingClientRect().height;
	this.events = {
		timeout : new CustomEvent('status', {'detail' : 'timeout'}),
		completed : new CustomEvent('status', {'detail' : 'completed'})
	};
};

Timer.prototype.startTime = function(){
	this.now = new Date().getTime();
	this.end = this.now + this.limit;
	this.interval = setInterval(this.countDown.bind(this), 1000);
};

Timer.prototype.countDown = function(){
	if (this.now < this.end) {
		this.timelapse = this.end - ++this.now;
		if (this.timelapse <= 10) {
			this.timerEl.classList.add('warning');
		}
		this.timerEl.textContent =  this.timelapse;
	} else {
		clearInterval(this.interval);
		this.timerEl.classList.remove('warning');
		// dispatch event 'timeout'
		this.timerEl.dispatchEvent(this.events.timeout);
	}
};

module.exports = Timer;
