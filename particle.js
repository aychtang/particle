(function(){

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.height = document.height;
canvas.width = document.width;
var cursorPosition = null;

var particleArray = [];

var drawBoard = function() {
	context.fillStyle = "rgba(0,0,0,0.3)";
	context.fillRect(0,0,canvas.width,canvas.height);
};

var makeParticle = function() {
	var originX = cursorPosition && cursorPosition.offsetX || document.width / 2;
	var originY = cursorPosition && cursorPosition.offsetY || document.height / 2;
	var particle = {};

	var randomRange = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	// Initialises position at mouse position or center and gives random x + y velocity.
	particle.x = originX;
	particle.y = originY;
	particle.vx = randomRange(-15, 15);
	particle.vy = randomRange(-15, 15);
	particle.size = 2;

	// Each step increment values by velocities.
	particle.update = function() {
		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.size -= 0.025;

		// Gameover.
		if (particle.x > canvas.width || particle.x < 0 || particle.y > canvas.height || particle.y < 0) {
			particle.vx = ~particle.vx;
			particle.vy = ~particle.vy;
		}

		if (particle.size < 0.1) {
			particleArray.splice(particleArray.indexOf(particle), 1);
		}
	};

	return particle;
};

var main = function() {
	requestAnimationFrame(main);
	drawBoard();
	for (var i = 0; i < 30; i++) {
		particleArray.push(makeParticle());
	}

	context.fillStyle = 'palegreen';

	for (var i = 0; i < particleArray.length; i++) {
		current = particleArray[i];
		current.update();

		context.fillRect(current.x, current.y, current.size, current.size);
	}
};

var initialise = function() {
	drawBoard();
	main();
};

initialise();

$(canvas).mousemove(function(e) {
	cursorPosition = e;
});


}())

